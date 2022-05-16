
import { LoggerService } from '@logger/logger.service'
import { Body, Controller, HttpCode, HttpStatus, InternalServerErrorException, Post, Query, ValidationPipe } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Logger } from 'winston'
import { FormatOutputItem } from './format.output.dto'
import { FormatInputItem } from './format.input.dto'
import { FormatService } from './format.service'


@ApiTags('Format Api\'s')
@Controller('format')
export class FormatController {

  private readonly logger: Logger
  constructor(private readonly loggerService: LoggerService,
              private readonly formatService: FormatService) {
    this.logger = this.loggerService.getLogger(FormatController.name)
  }

  /**
   * run an algorithm to turn the input into the format shown under Appendix 2 Output.
   * The JSON document needs to be re-organized by moving children into the correct parents.
   * The application should then return the formatted document in a JSON document.
   * @param input ArticlesScrapDto
   * @returns Request accepted or bad requests
   */
  @Post()
  @ApiResponse({ description: 'Formatted succesfully.', status: HttpStatus.OK, type: FormatOutputItem })
  @ApiResponse({ description: 'Invalid request', status: HttpStatus.BAD_REQUEST })
  @ApiBody({ schema: {type: 'object', example: {
    0: [{children: [],
      id: 10, // eslint-disable-line no-magic-numbers
      level: 0,
      parent_id: null,
      title: 'House',
    }],
    1: [{children: [],
      id: 12, // eslint-disable-line no-magic-numbers
      level: 1,
      parent_id: null,
      title: 'Door',
    }],
  },
  } })
  @HttpCode(HttpStatus.OK)
  public async FormatInput(@Body(new ValidationPipe({transform : true})) input: ReadonlyMap<string, readonly FormatInputItem[]>): Promise<readonly FormatOutputItem[]> {

    this.logger.info('request recieved to transform')

    return this.formatService.transform(input)
      .catch(error => {
        {
          this.logger.error('Error occurred fromatting the input ', error)
          throw new InternalServerErrorException('Error occured while formating')
        }
      })
  }

}
