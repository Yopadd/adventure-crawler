import EventBase from '#app/core/exploration/dungeon/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Collector extends EventBase<Player> {
  constructor() {
    super('Collector', "Un collectionneur, il doit pouvoir m'acheter quelque broutilles")
  }

  public resolve(player: Player): Note {
    const note = super.resolve(player)
    const moneyCount = player.countTag('money')
    if (moneyCount > 0) {
      player.backpack.removeAllFromTag('money')
      note.add(new Note(`Il est intéressé par mes ${moneyCount} objets de valeurs`, moneyCount))
    } else {
      note.add(new Note("Je n'ai rien pour lui malheureusement"))
    }
    return note
  }
}
