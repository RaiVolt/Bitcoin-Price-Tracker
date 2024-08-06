import { ApiProperty } from '@nestjs/swagger';

interface Time {
  updated: string;
  updatedISO: string;
  updateduk: string;
}

export enum Code {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}

export class BpiProperties<TCode extends Code = Code> {
  @ApiProperty({ example: 'USD', description: 'Currency code', enum: Code })
  code: TCode;

  @ApiProperty({ example: '&#36;', description: 'Currency symbol' })
  symbol: string;

  @ApiProperty({
    example: '34,123.4',
    description: 'Exchange rate as a string',
  })
  rate: string;

  @ApiProperty({
    example: 'United States Dollar',
    description: 'Currency description',
  })
  description: string;

  @ApiProperty({ example: 34123.4, description: 'Exchange rate as a float' })
  rate_float: number;
}

type Bpi<TCode extends Code = Code> = {
  [key in TCode]: BpiProperties<key>;
};

export interface BitcoinPrice {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

export class ErrorResponse {
  @ApiProperty({ example: 404, description: 'HTTP status code' })
  statusCode: number;

  @ApiProperty({ example: 'Not Found', description: 'Error message' })
  message: string;

  @ApiProperty({
    example: 'Resource not found',
    description: 'Detailed error description',
  })
  error: string;
}
