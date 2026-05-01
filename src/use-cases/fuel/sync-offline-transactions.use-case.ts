import { Injectable, Inject } from '@nestjs/common';
import {
  IEnergyWalletRepository,
  ENERGY_WALLET_REPOSITORY,
} from '../../core/ports/energy-wallet.repository.interface';
import {
  IFuelTransactionRepository,
  FUEL_TRANSACTION_REPOSITORY,
} from '../../core/ports/fuel-transaction.repository.interface';
import { FuelTransaction } from '../../core/domain/entities/fuel-transaction.entity';
import { SyncStatus } from '../../core/domain/enums/sync-status.enum';
import { ValidationMode } from '../../core/domain/enums/validation-mode.enum';
import { v4 as uuidv4 } from 'uuid';

export interface SyncTransactionDto {
  pecheurId: string;
  volumeLiters: number;
  date: string;
  geolocation: string;
  mode: string;
}

@Injectable()
export class SyncOfflineTransactionsUseCase {
  constructor(
    @Inject(ENERGY_WALLET_REPOSITORY)
    private readonly walletRepo: IEnergyWalletRepository,
    @Inject(FUEL_TRANSACTION_REPOSITORY)
    private readonly transactionRepo: IFuelTransactionRepository,
  ) {}

  async execute(transactions: SyncTransactionDto[]): Promise<any> {
    const results = [];

    for (const dto of transactions) {
      const wallet = await this.walletRepo.findByPecheurId(dto.pecheurId);

      const transaction = new FuelTransaction(
        uuidv4(),
        wallet ? wallet.id : 'unknown',
        dto.volumeLiters,
        new Date(dto.date),
        dto.geolocation,
        dto.mode as ValidationMode,
        SyncStatus.PENDING,
      );

      if (!wallet) {
        transaction.markAsRejected();
        await this.transactionRepo.save(transaction);
        results.push({ id: transaction.id, status: SyncStatus.REJECTED, reason: 'Wallet not found' });
        continue;
      }

      try {
        wallet.deduct(dto.volumeLiters);
        transaction.markAsSynced();
        
        await this.walletRepo.update(wallet);
        await this.transactionRepo.save(transaction);
        results.push({ id: transaction.id, status: SyncStatus.SYNCED });
      } catch (error: any) {
        transaction.markAsRejected();
        await this.transactionRepo.save(transaction);
        results.push({ id: transaction.id, status: SyncStatus.REJECTED, reason: error.message });
      }
    }

    return results;
  }
}
