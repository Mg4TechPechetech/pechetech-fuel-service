import { Injectable } from '@nestjs/common';
import { IFuelTransactionRepository } from '../../core/ports/fuel-transaction.repository.interface';
import { FuelTransaction } from '../../core/domain/entities/fuel-transaction.entity';

@Injectable()
export class InMemoryFuelTransactionRepository implements IFuelTransactionRepository {
  private readonly transactions = new Map<string, FuelTransaction>();

  async findById(id: string): Promise<FuelTransaction | null> {
    return this.transactions.get(id) || null;
  }

  async save(transaction: FuelTransaction): Promise<void> {
    this.transactions.set(transaction.id, transaction);
  }

  async update(transaction: FuelTransaction): Promise<void> {
    this.transactions.set(transaction.id, transaction);
  }
}
