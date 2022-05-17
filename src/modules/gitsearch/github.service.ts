
import { IServerConfig } from '@config/server.config'
import { LoggerService } from '@logger/logger.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { plainToClass } from 'class-transformer'
import { Logger } from 'winston'
import { GithubSearchDto } from './github.search.dto'
import { GithubSearchErrorDto } from './github.search.error.dto'
import { GithubSearchResultDto, SearchResultItems } from './github.search.result.dto'

@Injectable()
export class GithubService {

  private readonly logger: Logger
  private readonly serverConfig: IServerConfig
  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService) {

    this.logger = this.loggerService.getLogger(GithubService.name)
    this.serverConfig = configService.get<IServerConfig>('server')
  }

  /**
   * Perform the actual search using github search api's
   * @param searchDt0
   * @returns GithubSearchResultDto | GithubSearchErrorDto
   */
  public async gitSearch(searchDto: GithubSearchDto): Promise<GithubSearchResultDto> {

    try {
      const gitResult = await axios.get(`${this.serverConfig.githubSearchUrl}?q=${searchDto.q}&page=${searchDto.page}&per_page=${searchDto.per_page}`)

      const data = gitResult.data
      const resultItems = []
      for await (const item of data.items) {
        // eslint-disable-next-line functional/immutable-data
        resultItems.push(plainToClass(SearchResultItems, {
          file_name: item.name,
          file_path: item.path,
          repo_name: item.repository.name,
        }))
      }

      const result = plainToClass(GithubSearchResultDto, {
        items: resultItems,
        page: searchDto.page,
        per_page: searchDto.per_page,
        total: data.total_count,
      })

      return result
    } catch (error) {
      const status = error.response.status
      this.logger.error(`Error with search request query=${searchDto.q}, page=${searchDto.page} status=${status}`)
      const errors = error.response.data.errors

      const searchError = plainToClass(GithubSearchErrorDto, {
        status,
        message: errors[0].message,
      })

      throw searchError
    }
  }
}
