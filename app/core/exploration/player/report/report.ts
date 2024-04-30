import Adventure from '#app/core/exploration/adventure/adventure'
import Player, { PlayerScore } from '#app/core/exploration/player/player'
import { Comment } from '#app/core/exploration/player/report/note/note'
import { DateTime } from 'luxon'

export default class Report {
  constructor(
    public readonly player: Player,
    public readonly adventure: Adventure,
    public readonly comment: Comment,
    public readonly score: PlayerScore,
    public readonly exploredAt: DateTime = DateTime.now()
  ) {}
}
