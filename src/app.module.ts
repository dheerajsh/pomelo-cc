import serverConfig from '@config/server.config'
import { LoggerModule } from '@logger/logger.module'
import { FormatModule } from '@modules/format/format.module'
import { GithubModule } from '@modules/github/github.module'
import { HealthcheckModule } from '@modules/healthcheck/healthcheck.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot({
    load: [serverConfig],
  }),
  LoggerModule,
  HealthcheckModule,
  FormatModule,
  GithubModule],
})
export class AppModule { }
