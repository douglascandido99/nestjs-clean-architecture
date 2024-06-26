import { Entity } from '@/shared/domain/entities/entity'
import { SearchableInMemoryRepository } from '../../searchable-in-memory-repository'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubSearchableInMemoryRepository extends SearchableInMemoryRepository<StubEntity> {
  sortableFields: string[] = ['name']
  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items
    }
    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }
}

describe('InMemoryRepository unit tests', () => {
  let sut: StubSearchableInMemoryRepository

  beforeEach(() => {
    sut = new StubSearchableInMemoryRepository()
  })

  describe('applyFilter method', () => {
    it('should not filter items when filter param is null', async () => {
      const items = [new StubEntity({ name: 'name value', price: 50 })]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      const filteredItems = await sut['applyFilter'](items, null)
      expect(filteredItems).toStrictEqual(items)
      expect(spyFilterMethod).not.toHaveBeenCalled()
    })

    it('should filter using filter param', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 50 }),
        new StubEntity({ name: 'TEST', price: 50 }),
        new StubEntity({ name: 'fake', price: 50 }),
      ]
      const spyFilterMethod = jest.spyOn(items, 'filter')
      let filteredItems = await sut['applyFilter'](items, 'TEST')
      expect(filteredItems).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(1)

      filteredItems = await sut['applyFilter'](items, 'test')
      expect(filteredItems).toStrictEqual([items[0], items[1]])
      expect(spyFilterMethod).toHaveBeenCalledTimes(2)

      filteredItems = await sut['applyFilter'](items, 'no-filter')
      expect(filteredItems).toHaveLength(0)
      expect(spyFilterMethod).toHaveBeenCalledTimes(3)
    })
  })

  describe('applySort method', () => {})

  describe('applyPaginate method', () => {})

  describe('search method', () => {})
})
