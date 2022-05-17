import { registerAs } from '@nestjs/config'
import { ConfigFactory } from '@nestjs/config/dist/interfaces'

export default registerAs<ConfigFactory<IServerConfig>>('server', () => {
  return {
    githubSearchUrl: process.env.GITHUB_CODE_SEARCH_URL,
    logLevel: process.env.LOG_LEVEL,
    logTransport: process.env.LOG_TRANSPORT,
    port: parseInt(process.env.APP_PORT, 10) || 3000,  // eslint-disable-line no-magic-numbers
  }
})

/**
 * server related configs
 */
export interface IServerConfig {
  readonly port: number
  readonly logLevel: string
  readonly logTransport: string
  readonly githubSearchUrl: string
}

