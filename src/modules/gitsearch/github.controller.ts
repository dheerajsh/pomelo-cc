
import { LoggerService } from '@logger/logger.service'
import { Controller, Get, HttpCode, HttpException, HttpStatus, Query, ValidationPipe } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Logger } from 'winston'
import { GithubSearchDto } from './github.search.dto'
import { GithubSearchErrorDto } from './github.search.error.dto'
import { GithubSearchResultDto } from './github.search.result.dto'
import { GithubService } from './github.service'

@ApiTags('Github search Api\'s')
@Controller('github')
export class GithubController {

  private readonly logger: Logger
  constructor(private readonly loggerService: LoggerService,
              private readonly githubService: GithubService) {
    this.logger = this.loggerService.getLogger(GithubController.name)
  }


  /**
   * The Search API helps you search for the specific item you want to find.
   * For example, you can find a user or a specific file in a repository.
   * Think of it the way you think of performing a search on Google.
   * It's designed to help you find the one result you're looking for (or maybe the few results you're looking for).
   * Just like searching on Google, you sometimes want to see a few pages of search results so that you can find the item that best meets your needs.
   * To satisfy that need, the GitHub Search API provides up to 1,000 results for each search.
   * You can narrow your search using queries. To learn more about the search query syntax, see "Constructing a search query <https://docs.github.com/en/rest/search#constructing-a-search-query>."
   * @param searchDto
   * @returns
   */
  @Get('search')
  @ApiResponse({ description: 'searched succesfully.', status: HttpStatus.OK })
  @ApiResponse({ description: 'Invalid request', status: HttpStatus.BAD_REQUEST })
  @ApiResponse({ description: 'No result found', status: HttpStatus.NOT_FOUND })
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @HttpCode(HttpStatus.UNPROCESSABLE_ENTITY)
  public async search(@Query(new ValidationPipe({transform: true})) searchDto: GithubSearchDto): Promise<GithubSearchResultDto | GithubSearchErrorDto | HttpException> {

    this.logger.info(`request recieved to search on github code for query ${searchDto.q}, page = ${searchDto.page}`)

    try {
      const searchResult = await this.githubService.gitSearch(searchDto)

      return searchResult
    } catch (error) {

      throw new HttpException(error.message, error.status)
    }

  }
}
