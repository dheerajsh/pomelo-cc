
import { LoggerService } from '@logger/logger.service'
import { Injectable } from '@nestjs/common'
import { deserialize, serialize } from 'class-transformer'
import { Logger } from 'winston'
import { FormatOutputItem } from './format.output.dto'
import { FormatInputItem } from './format.input.dto'

@Injectable()
export class FormatService {

  private readonly logger: Logger
  constructor(
    private readonly loggerService: LoggerService) {

    this.logger = this.loggerService.getLogger(FormatService.name)
  }

  /**
   * Transform the input json from appendix1 to appendix2 see the challenge for details
   * https://github.com/pomelofashion/challenges/tree/master/challenge-nodejs
   *
   * First it converts the given unstructured input into an id=>item keymap
   * Then it rearrange the items with in each other using parent id
   * @param input
   * @returns array of formatted items
   */
  public async transform(input: ReadonlyMap<string, readonly FormatInputItem[]>): Promise<readonly FormatOutputItem[]> {

    const itemsMap = await this.transformIntoIdAndItemPair(input)

    // once the id=>item map is ready, we can iterate the map to establish the parent child relationships
    const parents = []
    for await (const [key, item] of itemsMap) {
      if (item.parent_id === null) {
        // eslint-disable-next-line functional/immutable-data
        parents.push(item)
      } else {
        const parent = itemsMap.get(item.parent_id)
        if (!parent.children) {
          // eslint-disable-next-line functional/immutable-data
          parent.children = []
        }
        // eslint-disable-next-line functional/immutable-data
        parent.children.push(item)
      }
    }

    return parents
  }

  /**
   * Convert the given input json into a id=>item keymap. i.e,
   * in this map all the items will be stored agains there id, it simplify the search of items just by id
   * @param input inputItems
   * @returns map of [id=>item]
   */
  public async transformIntoIdAndItemPair(input: ReadonlyMap<string, readonly FormatInputItem[]>): Promise<ReadonlyMap<number, FormatOutputItem>> {
    const itemsMap = new Map<number, FormatOutputItem>()

    // construct a id=>item map from the given request
    for await (const [key, items] of Object.entries(input)) {
      for await (const item of items) {
        const itemCopy = serialize(item)
        itemsMap.set(item.id, deserialize(FormatOutputItem, itemCopy))
      }
    }

    return itemsMap
  }
}
