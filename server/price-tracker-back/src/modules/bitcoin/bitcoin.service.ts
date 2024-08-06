import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BitcoinPrice } from './interfaces';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BitcoinService {
  private readonly logger = new Logger(BitcoinService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async fetchBitcoinPrice() {
    try {
      const response = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice.json',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BitcoinPrice = await response.json();
      const usdPrice = data.bpi.USD;

      // Store data in the database
      await this.prisma.bitcoinPrice.create({
        data: {
          code: usdPrice.code,
          rate: usdPrice.rate,
          description: usdPrice.description,
          rate_float: usdPrice.rate_float,
        },
      });

      this.logger.log('Bitcoin price data stored successfully.');
    } catch (error) {
      this.logger.error('Error fetching Bitcoin price:', error);
    }
  }

  async getLastTenPrices() {
    try {
      return this.prisma.bitcoinPrice.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    } catch (error) {
      this.logger.error('Error retrieving last 10 prices:', error);
      throw error;
    }
  }
}
