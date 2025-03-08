import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class Thief extends EventBase<Player> {
  constructor() {
    super(
      'Thief',
      "Je me baladais dans un marché, au milieu de la foule, quand j'ai entendu un cri dans ma direction 'Au voleur !'"
    )
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    if (player.hasTag('weapon')) {
      note.add(new Note("Heureusement, j'avais de quoi me défendre ! Il est reparti bredouille", 1))
    } else {
      player.backpack.empty()
      note.add(new Note("Je n'ai rien pu faire, il m'a tout pris !", 0))
    }
    return Resolution.Continue
  }
}
