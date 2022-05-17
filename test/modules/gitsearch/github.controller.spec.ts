import { LoggerModule } from '@logger/logger.module'
import { GithubController } from '@modules/github/github.controller'
import { GithubService } from '@modules/github/github.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('GithubController', () => {
  // eslint-disable-next-line functional/no-let
  let controller: GithubController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubController],
      imports: [
        LoggerModule,
        ConfigModule,
      ],
      providers: [GithubService],
    }).compile()

    controller = module.get<GithubController>(GithubController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
