import { Module } from '@nestjs/common';
import { CrashController } from './crash.controller';

@Module({
  controllers: [CrashController],
})
export class CrashModule {}
