import { Injectable } from '@nestjs/common';
import { IEnergyWalletRepository } from '../../core/ports/energy-wallet.repository.interface';
import { EnergyWallet } from '../../core/domain/entities/energy-wallet.entity';

@Injectable()
export class InMemoryEnergyWalletRepository implements IEnergyWalletRepository {
  private readonly wallets = new Map<string, EnergyWallet>();

  async findByPecheurId(pecheurId: string): Promise<EnergyWallet | null> {
    for (const wallet of this.wallets.values()) {
      if (wallet.pecheurId === pecheurId) {
        return wallet;
      }
    }
    return null;
  }

  async save(wallet: EnergyWallet): Promise<void> {
    this.wallets.set(wallet.id, wallet);
  }

  async update(wallet: EnergyWallet): Promise<void> {
    this.wallets.set(wallet.id, wallet);
  }
}
