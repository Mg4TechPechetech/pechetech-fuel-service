import { SyncOfflineTransactionsUseCase, SyncTransactionDto } from '../../../src/use-cases/fuel/sync-offline-transactions.use-case';
import { IEnergyWalletRepository } from '../../../src/core/ports/energy-wallet.repository.interface';
import { IFuelTransactionRepository } from '../../../src/core/ports/fuel-transaction.repository.interface';
import { EnergyWallet } from '../../../src/core/domain/entities/energy-wallet.entity';
import { SyncStatus } from '../../../src/core/domain/enums/sync-status.enum';

describe('SyncOfflineTransactionsUseCase', () => {
  let useCase: SyncOfflineTransactionsUseCase;
  let mockWalletRepo: jest.Mocked<IEnergyWalletRepository>;
  let mockTransactionRepo: jest.Mocked<IFuelTransactionRepository>;

  beforeEach(() => {
    mockWalletRepo = {
      findByPecheurId: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    mockTransactionRepo = {
      findById: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    useCase = new SyncOfflineTransactionsUseCase(mockWalletRepo, mockTransactionRepo);
  });

  it('should successfully sync transaction and deduct wallet balance', async () => {
    const wallet = new EnergyWallet('w1', 'p1', 100, new Date());
    mockWalletRepo.findByPecheurId.mockResolvedValue(wallet);

    const dto: SyncTransactionDto = {
      pecheurId: 'p1',
      volumeLiters: 20,
      date: new Date().toISOString(),
      geolocation: '14.6937,-17.4441',
      mode: 'QR_CODE',
    };

    const results = await useCase.execute([dto]);

    expect(results).toHaveLength(1);
    expect(results[0].status).toBe(SyncStatus.SYNCED);
    expect(wallet.monthlyBalanceLiters).toBe(80);
    expect(mockWalletRepo.update).toHaveBeenCalledWith(wallet);
    expect(mockTransactionRepo.save).toHaveBeenCalled();
  });

  it('should reject transaction if wallet is not found', async () => {
    mockWalletRepo.findByPecheurId.mockResolvedValue(null);

    const dto: SyncTransactionDto = {
      pecheurId: 'p_unknown',
      volumeLiters: 20,
      date: new Date().toISOString(),
      geolocation: '14.6937,-17.4441',
      mode: 'USSD',
    };

    const results = await useCase.execute([dto]);

    expect(results).toHaveLength(1);
    expect(results[0].status).toBe(SyncStatus.REJECTED);
    expect(mockWalletRepo.update).not.toHaveBeenCalled();
    expect(mockTransactionRepo.save).toHaveBeenCalled();
  });

  it('should reject transaction if wallet has insufficient balance', async () => {
    const wallet = new EnergyWallet('w1', 'p1', 10, new Date());
    mockWalletRepo.findByPecheurId.mockResolvedValue(wallet);

    const dto: SyncTransactionDto = {
      pecheurId: 'p1',
      volumeLiters: 20, // trying to deduct 20 when only 10 is available
      date: new Date().toISOString(),
      geolocation: '14.6937,-17.4441',
      mode: 'QR_CODE',
    };

    const results = await useCase.execute([dto]);

    expect(results).toHaveLength(1);
    expect(results[0].status).toBe(SyncStatus.REJECTED);
    expect(results[0].reason).toBe('Insufficient fuel quota');
    expect(wallet.monthlyBalanceLiters).toBe(10); // Balance unchanged
    expect(mockWalletRepo.update).not.toHaveBeenCalled();
    expect(mockTransactionRepo.save).toHaveBeenCalled();
  });
});
