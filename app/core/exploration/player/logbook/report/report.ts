import Dungeon from '#app/core/exploration/dungeon/dungeon'
import { Comment } from '#app/core/exploration/player/logbook/report/note/note'
import { DateTime } from 'luxon'
import { PlayerScore } from '#app/core/exploration/player/player'

export default class Report {
  constructor(
    public readonly dungeon: Dungeon,
    public readonly comment: Comment,
    public readonly score: PlayerScore,
    public readonly exploredAt: DateTime = DateTime.now()
  ) {}
}
