import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { CrashModule } from './crash/crash.module';
import { DataCommand } from './commands/data.command';
import { ParseCommand } from './commands/parse.command';

@Module({
  imports: [TypeOrmModule.forRoot(), ConsoleModule, CrashModule],
  controllers: [],
  providers: [DataCommand, ParseCommand],
})
export class AppModule {}
