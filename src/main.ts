import * as env from 'dotenv'
// Load .env file if exists (shouldn't exist for integration/production)
// Uses for development environments
env.config()

import './module-aliases'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { IServerConfig } from '@config/server.config'
import { LoggerService } from '@logger/logger.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {cors: true})
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  const options = new DocumentBuilder()
    .setTitle('Pomelo coding challange')
    .setDescription('The Service serves the api for pomelo coding challenge')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/docs', app, document)

  const configService = app.get(ConfigService)
  const serverConfig = configService.get<IServerConfig>('server')
  await app.listen(serverConfig.port)

  // initilizing tracer
  const logger = app.get(LoggerService).getLogger('Main')
  logger.info(`Application is running on: ${await app.getUrl()}`)

}
bootstrap() // eslint-disable-line @typescript-eslint/no-floating-promises