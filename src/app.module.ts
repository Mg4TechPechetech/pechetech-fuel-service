import { Module } from '@nestjs/common';
import { FuelModule } from './fuel.module';

@Module({
  imports: [FuelModule],
})
export class AppModule {}
