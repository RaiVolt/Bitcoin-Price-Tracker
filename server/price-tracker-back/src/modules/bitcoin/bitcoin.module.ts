import { Module } from '@nestjs/common';
import { BitcoinController } from './bitcoin.controller';
import { BitcoinGateway } from './bitcoin.gateway';
import { BitcoinService } from './bitcoin.service';
import { PrismaModule } from 'src/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [BitcoinController],
  providers: [BitcoinGateway, BitcoinService],
})
export class BitcoinModule {}
