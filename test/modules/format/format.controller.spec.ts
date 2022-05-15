import { LoggerModule } from '@logger/logger.module'
import { FormatService } from '@modules/format/format.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { FormatController } from '../../../src/modules/format/format.controller'

describe('FormatController', () => {
  // eslint-disable-next-line functional/no-let
  let controller: FormatController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormatController],
      imports: [
        LoggerModule,
        ConfigModule,
      ],
      providers: [FormatService],
    }).compile()

    controller = module.get<FormatController>(FormatController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
