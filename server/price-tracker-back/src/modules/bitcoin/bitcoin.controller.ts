import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BitcoinService } from './bitcoin.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BpiProperties, ErrorResponse } from './interfaces';

@Controller('bitcoin')
@ApiTags('bitcoin')
export class BitcoinController {
  constructor(private readonly bitcoinService: BitcoinService) {}

  @ApiOperation({ summary: 'Get last 10 Bitcoin prices' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The last 10 Bitcoin price records',
    isArray: true,
    type: BpiProperties,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ErrorResponse,
  })
  @Get('prices')
  async getLastTenPrices() {
    return this.bitcoinService.getLastTenPrices();
  }
}
