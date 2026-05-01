import { Controller, Post, Body } from '@nestjs/common';
import { SyncOfflineTransactionsUseCase, SyncTransactionDto } from '../../use-cases/fuel/sync-offline-transactions.use-case';

@Controller('fuel')
export class FuelController {
  constructor(private readonly syncUseCase: SyncOfflineTransactionsUseCase) {}

  @Post('sync')
  async syncOfflineTransactions(@Body() transactions: SyncTransactionDto[]) {
    const results = await this.syncUseCase.execute(transactions);
    return {
      message: 'Batch synchronization processed',
      results,
    };
  }
}
