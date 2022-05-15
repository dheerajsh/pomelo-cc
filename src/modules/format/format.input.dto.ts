import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsNumber, IsOptional, ValidateIf, ValidateNested } from 'class-validator'

export class FormatInputItem {

  @ApiProperty({
    description: 'id',
    required: true,
  })
  @IsDefined()
  @IsNumber()
  @Type(() => {
    return Number
  })
  readonly id: number

  @ApiProperty({
    description: 'Title of the item i.e house, window etc',
    required: false,
    type: Number,
  })
  @IsDefined()
  readonly title: string

  @ApiProperty({
    description: 'level of the item i.e 0 for the Most parent and 1 for immediate child the so on',
    required: true,
  })
  @IsDefined()
  @IsNumber()
  @Type(() => {
    return Number
  })
  readonly level: number

  @ApiProperty({
    description: 'parnet id, this is required to establish the relationship of items',
    required: true,
  })
  @IsDefined()
  @IsNumber()
  @ValidateIf((object, value) => {
    return value !== null
  })
  @Type(() => {
    return Number
  })
  readonly parent_id: number | null

  @IsOptional()
  readonly children: readonly void[]
}

export class FormatInputDto {

  @ValidateNested( {
    each: true,
  })
  readonly 0: readonly FormatInputItem[]

  @ValidateNested( {
    each: true,
  })
  @IsOptional()
  readonly 1: readonly FormatInputItem[]

  @ValidateNested( {
    each: true,
  })
  @IsOptional()
  // eslint-disable-next-line no-magic-numbers
  readonly 2: readonly FormatInputItem[]
}

