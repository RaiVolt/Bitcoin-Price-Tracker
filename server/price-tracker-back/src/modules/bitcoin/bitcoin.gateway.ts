import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BitcoinService } from './bitcoin.service';
import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@WebSocketGateway()
export class BitcoinGateway implements OnGatewayInit, OnGatewayConnection {
  private readonly logger = new Logger(BitcoinGateway.name);
  @WebSocketServer()
  server: Server;

  constructor(private readonly bitcoinService: BitcoinService) {}

  afterInit() {
    this.sendLatestData();
    this.logger.log('Bitcoin Gateway has Initialized');
  }

  handleConnection(client: any) {
    const { sockets } = this.server.sockets;
    this.sendLatestData();
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendLatestData() {
    this.logger.log('Send latest data');
    const latestData = await this.bitcoinService.getLastTenPrices();
    this.server.emit('newPrice', latestData);
  }
}
