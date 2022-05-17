export class SearchResultItems {
  readonly repo_name: string
  readonly file_name: string
  readonly file_path: string
}

export class GithubSearchResultDto {
  readonly per_page: number
  readonly page: number
  readonly total: number
  readonly items: readonly SearchResultItems[]
}
