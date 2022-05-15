import { LoggerModule } from '@logger/logger.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { FormatController } from './format.controller'
import { FormatService } from './format.service'

@Module({
  controllers: [FormatController],
  imports: [
    LoggerModule,
    ConfigModule,
  ],
  providers: [FormatService],
})
export class FormatModule {}
