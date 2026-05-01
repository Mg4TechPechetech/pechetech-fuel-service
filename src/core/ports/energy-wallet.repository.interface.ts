import { EnergyWallet } from '../domain/entities/energy-wallet.entity';

export const ENERGY_WALLET_REPOSITORY = 'ENERGY_WALLET_REPOSITORY';

export interface IEnergyWalletRepository {
  findByPecheurId(pecheurId: string): Promise<EnergyWallet | null>;
  save(wallet: EnergyWallet): Promise<void>;
  update(wallet: EnergyWallet): Promise<void>;
}
