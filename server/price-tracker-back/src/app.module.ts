import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { BitcoinModule } from './modules/bitcoin/bitcoin.module';
import { PrismaModule } from './prisma';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CommonModule,
    BitcoinModule,
    PrismaModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
