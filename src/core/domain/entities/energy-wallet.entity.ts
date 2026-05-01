export class EnergyWallet {
  constructor(
    public readonly id: string,
    public readonly pecheurId: string,
    public monthlyBalanceLiters: number,
    public lastUpdated: Date,
  ) {}

  deduct(volume: number): void {
    if (this.monthlyBalanceLiters < volume) {
      throw new Error('Insufficient fuel quota');
    }
    this.monthlyBalanceLiters -= volume;
    this.lastUpdated = new Date();
  }
}
