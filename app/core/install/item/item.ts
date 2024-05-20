import ItemExploration, {
  ItemDescription as ItemDescriptionExploration,
  ItemName as ItemNameExploration,
} from '#app/core/exploration/player/backpack/item/item'
import { Tag } from '#app/core/install/tag/tag'

export default class Item extends ItemExploration {
  public readonly hidden: boolean

  constructor(input: { name: string; description: string; tags: Tag[]; hidden?: boolean }) {
    super(input.name, input.description, input.tags)
    this.hidden = input.hidden ?? false
  }
}

export type ItemName = ItemNameExploration

export type ItemDescription = ItemDescriptionExploration
