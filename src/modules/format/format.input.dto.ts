import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayMaxSize, arrayMaxSize, IsArray, IsDefined, IsEmpty, IsNumber, IsOptional, ValidateIf, ValidateNested } from 'class-validator'

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
    required: true,
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
  @ArrayMaxSize(0)
  readonly children: readonly void[]
}


