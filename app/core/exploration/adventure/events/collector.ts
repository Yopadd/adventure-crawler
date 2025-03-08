import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class Collector extends EventBase<Player> {
  constructor() {
    super('Collector', "Un collectionneur, il devrait pouvoir m'acheter quelques broutilles")
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    const moneyCount = player.countTag('money')
    if (player.hasTag('goat')) {
      note.add(
        new Note('À la vu de la chèvre le collectionneur a refusé de me parler et à fermé boutique')
      )
    } else if (moneyCount > 0) {
      player.backpack.removeAllFromTag('money')
      if (moneyCount === 1) {
        note.add(new Note('Il était intéressé par un de mes objets de valeur', moneyCount))
      } else {
        note.add(new Note(`Il était intéressé par ${moneyCount} objets de valeur`, moneyCount))
      }
    } else {
      note.add(new Note("Je n'avais rien pour lui malheureusement"))
    }
    return Resolution.Continue
  }
}
