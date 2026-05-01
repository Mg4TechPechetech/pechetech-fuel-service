import { SyncStatus } from '../enums/sync-status.enum';
import { ValidationMode } from '../enums/validation-mode.enum';

export class FuelTransaction {
  constructor(
    public readonly id: string,
    public readonly walletId: string,
    public readonly volumeLiters: number,
    public readonly date: Date,
    public readonly geolocation: string,
    public readonly mode: ValidationMode,
    public syncStatus: SyncStatus,
  ) {}

  markAsSynced(): void {
    this.syncStatus = SyncStatus.SYNCED;
  }

  markAsRejected(): void {
    this.syncStatus = SyncStatus.REJECTED;
  }
}
