import { LoggerModule } from '@logger/logger.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GitsearchController } from './gitsearch.controller'
import { GitsearchService } from './gitsearch.service'

@Module({
  controllers: [GitsearchController],
  imports: [
    LoggerModule,
    ConfigModule,
  ],
  providers: [GitsearchService],
})
export class GitsearchModule {}
