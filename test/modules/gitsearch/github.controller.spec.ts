import { LoggerModule } from '@logger/logger.module'
import { GitsearchController } from '@modules/gitsearch/gitsearch.controller'
import { GitsearchService } from '@modules/gitsearch/gitsearch.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('GithubController', () => {
  // eslint-disable-next-line functional/no-let
  let controller: GitsearchController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GitsearchController],
      imports: [
        LoggerModule,
        ConfigModule,
      ],
      providers: [GitsearchService],
    }).compile()

    controller = module.get<GitsearchController>(GitsearchController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
