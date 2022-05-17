import { LoggerModule } from '@logger/logger.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GithubController } from './github.controller'
import { GithubService } from './github.service'

@Module({
  controllers: [GithubController],
  imports: [
    LoggerModule,
    ConfigModule,
  ],
  providers: [GithubService],
})
export class GithubModule {}
