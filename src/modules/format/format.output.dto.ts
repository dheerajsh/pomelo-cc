import { ApiProperty } from '@nestjs/swagger'

export class FormatOutputItem {

  @ApiProperty()
  readonly id: number
  @ApiProperty()
  readonly title: string
  @ApiProperty()
  readonly level: number
  @ApiProperty()
  readonly parent_id: number | null

  // eslint-disable-next-line functional/prefer-readonly-type
  @ApiProperty({
    example: {
      children: [],
      // eslint-disable-next-line no-magic-numbers
      id: 12,
      level: 1,
      parent_id: null,
      title: 'window'},
    isArray: true,
    type: FormatOutputItem,
  })
  children: FormatOutputItem[] // eslint-disable-line functional/prefer-readonly-type
}
