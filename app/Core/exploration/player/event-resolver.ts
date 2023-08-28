import { Tag } from 'App/Core/exploration/tag/tag'

export interface EventResolver {
  hasTag(tag: Tag): boolean
}
