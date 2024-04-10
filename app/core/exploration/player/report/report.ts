import Dungeon from '#app/core/exploration/dungeon/dungeon'
import Player, { PlayerScore } from '#app/core/exploration/player/player'
import { Comment } from '#app/core/exploration/player/report/note/note'
import { DateTime } from 'luxon'

export default class Report {
  constructor(
    public readonly player: Player,
    public readonly dungeon: Dungeon,
    public readonly comment: Comment,
    public readonly score: PlayerScore,
    public readonly exploredAt: DateTime = DateTime.now()
  ) {}
}
