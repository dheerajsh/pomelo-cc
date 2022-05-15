import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class ArticlesFilterInput {

  @ApiProperty({
    description: 'offset record number for pagination, default is 0',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => {
    return Number
  })
  readonly offset: number = 0 // eslint-disable-line no-magic-numbers

  @ApiProperty({
    description: 'limit number of records for pagination, default is 10',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => {
    return Number
  })
  readonly limit: number = 10 // eslint-disable-line no-magic-numbers

  @ApiProperty({
    description: 'Author name, articles to be filter',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  readonly author: string

}

