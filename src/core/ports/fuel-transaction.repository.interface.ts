import { FuelTransaction } from '../domain/entities/fuel-transaction.entity';

export const FUEL_TRANSACTION_REPOSITORY = 'FUEL_TRANSACTION_REPOSITORY';

export interface IFuelTransactionRepository {
  findById(id: string): Promise<FuelTransaction | null>;
  save(transaction: FuelTransaction): Promise<void>;
  update(transaction: FuelTransaction): Promise<void>;
}
