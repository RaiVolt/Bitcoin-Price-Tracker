import { Module } from '@nestjs/common';
import { LoggerService } from './logger';
import { LogInterceptor } from './interceptors';
// import { TerminusModule } from '@nestjs/terminus';

// import { HealthController } from './controller';
// import { LogInterceptor } from './flow';
// import { configProvider, LoggerService, PrismaService } from './provider';

@Module({
  // imports: [TerminusModule],
  providers: [LoggerService, LogInterceptor],
  exports: [LoggerService, LogInterceptor],
  // controllers: [HealthController],
})
export class CommonModule {}
