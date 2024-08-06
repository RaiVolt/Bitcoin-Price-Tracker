import { Test, TestingModule } from '@nestjs/testing';
import { BitcoinGateway } from '../bitcoin.gateway';

describe('BitcoinGateway', () => {
  let gateway: BitcoinGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitcoinGateway],
    }).compile();

    gateway = module.get<BitcoinGateway>(BitcoinGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
