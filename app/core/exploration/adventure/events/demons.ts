import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class Demons extends EventBase<Player> {
  constructor() {
    super('Demons', 'Des créatures ailées des enfers me pourchassaient')
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    if (player.hasTag('goat')) {
      note.add(new Note('Étrangement les démons sont restés a distance', 6))
    } else if (player.hasTag('weapon', 'ranged weapon')) {
      const bonus = player.countTag('magic resistance')
      note.add(
        new Note(
          "J'ai réussi à les tenir à distance, elles devraient me laisser tranquille pour un moment",
          1 + bonus
        )
      )
    } else {
      const bonus = player.countTag('stealth')
      note.add(
        new Note(
          "Je n'ai pu que fuir le plus vite possible et me cacher pendant plusieurs heures pour leur échapper",
          bonus
        )
      )
    }
    return Resolution.Continue
  }
}
