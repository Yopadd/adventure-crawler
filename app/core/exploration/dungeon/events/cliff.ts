import EventBase from '#app/core/exploration/dungeon/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Cliff extends EventBase<Player> {
  constructor() {
    super('Cliff', 'Une falaise se dresse devant moi')
  }

  public resolve(player: Player): Note {
    if (player.countTag('climbing') > 1) {
      return new Note(
        "C'est pas un soucis, l’ascension devrait-être facile",
        player.countTag('climbing') + 1
      )
    }
    if (player.countTag('climbing') === 1) {
      return new Note("Je devrai pouvoir m'en sortir, mais l'ascension ne sera pas facile", 1)
    }
    return new Note('Je ferais mieux de trouver un nouveau passage')
  }
}
