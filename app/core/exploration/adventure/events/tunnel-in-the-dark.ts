import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class TunnelInTheDark extends EventBase<Player> {
  constructor() {
    super('Tunnel In The Dark', 'Il faisait vraiment très sombre ici')
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('light')) {
      note.add(new Note("J'avais de quoi m'éclairer", 1))
    } else {
      note.add(
        new Note(
          "J'aurais mieux fait de ne pas m'aventurer ici, j'aurais dû chercher un autre chemin"
        )
      )
      return true
    }
    return false
  }
}
