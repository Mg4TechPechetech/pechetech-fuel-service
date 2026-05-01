import { Module } from '@nestjs/common';
import { FuelController } from './presentation/controllers/fuel.controller';
import { SyncOfflineTransactionsUseCase } from './use-cases/fuel/sync-offline-transactions.use-case';
import { ENERGY_WALLET_REPOSITORY } from './core/ports/energy-wallet.repository.interface';
import { FUEL_TRANSACTION_REPOSITORY } from './core/ports/fuel-transaction.repository.interface';
import { InMemoryEnergyWalletRepository } from './infrastructure/repositories/in-memory-energy-wallet.repository';
import { InMemoryFuelTransactionRepository } from './infrastructure/repositories/in-memory-fuel-transaction.repository';

@Module({
  controllers: [FuelController],
  providers: [
    SyncOfflineTransactionsUseCase,
    {
      provide: ENERGY_WALLET_REPOSITORY,
      useClass: InMemoryEnergyWalletRepository,
    },
    {
      provide: FUEL_TRANSACTION_REPOSITORY,
      useClass: InMemoryFuelTransactionRepository,
    },
  ],
})
export class FuelModule {}
