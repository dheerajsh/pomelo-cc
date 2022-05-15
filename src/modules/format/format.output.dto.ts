
export class FormatOutputItem {

  readonly id: number
  readonly title: string

  readonly level: number
  readonly parent_id: number | null

  // eslint-disable-next-line functional/prefer-readonly-type
  children: FormatOutputItem[]
}
