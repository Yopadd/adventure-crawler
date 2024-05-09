import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class TunnelInTheDark extends EventBase<Player> {
  constructor() {
    super('Tunnel In The Dark', 'Il fait vraiment très sombre ici')
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('light')) {
      note.add(new Note("J'ai de quoi m'éclairer", 1))
    } else {
      note.add(
        new Note("Je ferais mieux de ne pas m'aventurer ici, je vais chercher un autre chemin")
      )
    }
    return false
  }
}
