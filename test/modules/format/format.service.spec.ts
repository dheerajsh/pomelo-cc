/* eslint-disable no-magic-numbers */
import { LoggerModule } from '@logger/logger.module'
import { FormatInputItem } from '@modules/format/format.input.dto'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { FormatService } from '../../../src/modules/format/format.service'

describe('FormatService', () => {
  // eslint-disable-next-line functional/no-let
  let service: FormatService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        LoggerModule,
        ConfigModule,
      ],
      providers: [FormatService],
    }).compile()

    service = module.get<FormatService>(FormatService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('FormatService.transformIntoIdAndItemPair', () => {
    it('should convert the input into id=>item key-value map', async () => {
      const items: readonly FormatInputItem[]  = [{
        children: [],
        id: 12,
        level: 1,
        parent_id: 10,
        title: 'Red Roof',
      },
      {
        children: [],
        id: 18,
        level: 1,
        parent_id: 10,
        title: 'Blue Roof',
      },
      {
        children: [],
        id: 13,
        level: 1,
        parent_id: 10,
        title: 'Wall',
      }]

      const itemMap = {
        0: items,
      } as unknown as ReadonlyMap<string, readonly FormatInputItem[]>

      const keyItemMap = await service.transformIntoIdAndItemPair(itemMap)
      expect(keyItemMap.size).toBe(3)
      expect(keyItemMap.get(13).id).toBe(13)
      expect(keyItemMap.get(18).parent_id).toBe(10)
      expect(keyItemMap.get(12).title).toBe('Red Roof')

    })
  })

  describe('FormatService.transform', () => {
    it('should convert the input parent child structure for 1 list of items and 1 level', async () => {
      const items0: readonly FormatInputItem[] = [
        {
          children: [],
          id: 10,
          level: 1,
          parent_id: null,
          title: 'House',
        },
      ]
      const items1: readonly FormatInputItem[]  = [
        {
          children: [],
          id: 12,
          level: 1,
          parent_id: 10,
          title: 'Red Roof',
        },
        {
          children: [],
          id: 18,
          level: 1,
          parent_id: 10,
          title: 'Blue Roof',
        },
        {
          children: [],
          id: 13,
          level: 1,
          parent_id: 10,
          title: 'Wall',
        }]

      const itemMap = {
        0: items0,
        1: items1,
      } as unknown as ReadonlyMap<string, readonly FormatInputItem[]>

      const parents = await service.transform(itemMap)
      expect(parents.length).toBe(1)
      expect(parents[0].id).toBe(10)
      expect(parents[0].title).toBe('House')
      expect(parents[0].children.length).toBe(3)

    })
  })
  describe('FormatService.transform', () => {
    it('should convert the input parent child structure for 2 list of items and 2 level', async () => {
      const items0: readonly FormatInputItem[] = [
        {
          children: [],
          id: 10,
          level: 1,
          parent_id: null,
          title: 'House',
        },
      ]
      const items1: readonly FormatInputItem[]  = [
        {
          children: [],
          id: 12,
          level: 1,
          parent_id: 10,
          title: 'Red Roof',
        },
        {
          children: [],
          id: 18,
          level: 1,
          parent_id: 10,
          title: 'Blue Roof',
        },
        {
          children: [],
          id: 13,
          level: 1,
          parent_id: 10,
          title: 'Wall',
        }]
      const items2: readonly FormatInputItem[]  = [
        {
          children: [],
          id: 17,
          level: 2,
          parent_id: 12,
          title: 'Blue Window',
        },
        {
          children: [],
          id: 16,
          level: 2,
          parent_id: 13,
          title: 'Door',
        },
        {
          children: [],
          id: 15,
          level: 2,
          parent_id: 12,
          title: 'Red Window',
        }]

      const itemMap = {
        0: items0,
        1: items1,
        2: items2,
      } as unknown as ReadonlyMap<string, readonly FormatInputItem[]>

      const parents = await service.transform(itemMap)
      expect(parents.length).toBe(1)
      expect(parents[0].id).toBe(10)
      expect(parents[0].title).toBe('House')
      expect(parents[0].children.length).toBe(3)
      expect(parents[0].children[0].level).toBe(1)
      expect(parents[0].children[0].id).toBe(12)
      expect(parents[0].children[0].children.length).toBe(2)
      expect(parents[0].children[0].children[0].id).toBe(17)

    })
  })
})
