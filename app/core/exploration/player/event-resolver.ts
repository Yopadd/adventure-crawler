import { Tag } from '#app/core/exploration/tag/tag'

export interface EventResolver {
  hasTag(tag: Tag): boolean
}
