import EventBase from '#app/core/exploration/dungeon/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class CrossingLavaRiver extends EventBase<Player> {
  constructor() {
    super(
      'Crossing Lava River',
      'Devant moi une rivière de lave, impossible de continuer sans traverser'
    )
  }

  public resolve(player: Player, note: Note): Note | undefined {
    super.resolve(player, note)
    if (player.hasTag('fire resistance')) {
      note.add(new Note("Heureusement, j'ai de quoi me protéger", 1))
    } else {
      return undefined
    }
    if (player.hasTag('hydration')) {
      note.add(new Note("Un peu d'eau fraîche avec cette chaleur, un plaisir", 1))
    }
    return note
  }
}
