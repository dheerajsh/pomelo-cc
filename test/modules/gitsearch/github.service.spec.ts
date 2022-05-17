/* eslint-disable no-magic-numbers */
import { LoggerModule } from '@logger/logger.module'
import { GithubSearchDto } from '@modules/gitsearch/gitsearch.search.dto'
import { GitsearchService } from '@modules/gitsearch/gitsearch.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('FormatService', () => {
  // eslint-disable-next-line functional/no-let
  let service: GitsearchService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule,
        ConfigModule,
      ],
      providers: [GitsearchService, {
        provide: ConfigService,
        useValue: {
          // mocking get server config
          get: jest.fn((key: string) => {
            if (key === 'server') {
              return {githubSearchUrl: 'http://dummygithuburl.com'}
            }

            return null
          }),
        },
      }],
    }).compile()

    service = module.get<GitsearchService>(GitsearchService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })


  describe('FormatService.transform', () => {
    it('should return the result for given search parameters', async () => {
      const gitSearchDto: GithubSearchDto = {
        page:1,
        per_page: 3,
        q: 'addClass+user:test',
      }

      const searchResults = {
        data: {
          items: [
            {
              name: 'test file name 1',
              path: 'test file path 1',
              repository: {name: 'test repo 1'},
            },
            {
              name: 'test file name 2',
              path: 'test file path 2',
              repository: {name: 'test repo 2'},
            },
            {
              name: 'test file name 3',
              path: 'test file path 3',
              repository: {name: 'test repo 3'},
            },
          ],
          total_count: 200,
        },
      }
      // mocked github search api to return success result
      mockedAxios.get.mockResolvedValueOnce(searchResults)
      const result = await service.gitSearch(gitSearchDto)

      expect(axios.get).toHaveBeenCalledWith(`http://dummygithuburl.com?q=${gitSearchDto.q}&page=${gitSearchDto.page}&per_page=${gitSearchDto.per_page}`)
      expect(result.total).toBe(200)
    })
    it('should return the error for given search parameters if github api fails', async () => {
      const gitSearchDto: GithubSearchDto = {
        page:1,
        per_page: 3,
        q: 'unformatted text',
      }

      const errorResponse = {
        response: {
          status: 422,
          data: {
            errors: [{
              message: 'Unproceble entity, query not supported',
            }],
          },
        },
      }
      // mocked github search api to fail
      mockedAxios.get.mockRejectedValueOnce(errorResponse)
      try {
        await service.gitSearch(gitSearchDto)
      } catch (error) {
        expect(axios.get).toHaveBeenCalledWith(`http://dummygithuburl.com?q=${gitSearchDto.q}&page=${gitSearchDto.page}&per_page=${gitSearchDto.per_page}`)
        expect(error.status).toBe(422)
        expect(error.message).toBe('Unproceble entity, query not supported')
      }

    })
  })
})
