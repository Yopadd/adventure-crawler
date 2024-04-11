import { Tag } from '#app/core/install/tag/tag'

export interface EventResolver {
  hasTag(tag: Tag): boolean
}
