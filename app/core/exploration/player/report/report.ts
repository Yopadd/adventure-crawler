import Adventure from '#app/core/exploration/adventure/adventure'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { DateTime } from 'luxon'

export default class Report {
  constructor(
    public readonly player: Player,
    public readonly adventure: Adventure,
    private readonly notes: Note[],
    public readonly exploredAt: DateTime = DateTime.now()
  ) {}

  public get comment(): string {
    return this.notes
      .filter((note) => note.comment.length > 0)
      .reduce((acc, note) => acc.concat(note.comment.get(), '\n'), '')
  }

  public get path(): string {
    const eventCount = this.adventure.eventCount
    const eventResolvedCount = this.notes.length
    return `${'O'.repeat(eventResolvedCount)}${'X'.repeat(eventCount - eventResolvedCount)}`
      .split('')
      .join('-')
  }

  public get score(): number {
    return this.notes.reduce((acc, note) => acc + note.score.get(), 0)
  }
}
