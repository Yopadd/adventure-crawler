import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import { Comment } from 'App/Core/exploration/player/logbook/report/note/note'
import { PlayerScore } from '../../player'

export default class Report {
  constructor(
    public readonly dungeon: Dungeon,
    public readonly comment: Comment,
    public readonly score: PlayerScore,
    public readonly exploredAt = new Date()
  ) {}
}
