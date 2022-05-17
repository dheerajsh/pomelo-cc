import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'


export class GithubSearchDto {
  @ApiProperty({
    description: 'search query',
    required: true,
    type: String,
  })
  @IsString()
  readonly q: string

  @ApiProperty({
    description: 'limit number of records per page for pagination, default is 10',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => {
    return Number
  })
  readonly per_page: number = 10 // eslint-disable-line no-magic-numbers

  @ApiProperty({
    description: 'page number for pagination, default is 1',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => {
    return Number
  })
  readonly page: number = 1 // eslint-disable-line no-magic-numbers
}
