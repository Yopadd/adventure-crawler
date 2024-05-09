import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Collector extends EventBase<Player> {
  constructor() {
    super('Collector', "Un collectionneur, il doit pouvoir m'acheter quelques broutilles")
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    const moneyCount = player.countTag('money')
    if (moneyCount > 0) {
      player.backpack.removeAllFromTag('money')
      if (moneyCount === 1) {
        note.add(new Note(`Il est intéressé par un de mes objets de valeurs`, moneyCount))
      } else {
        note.add(new Note(`Il est intéressé ${moneyCount} objets de valeurs`, moneyCount))
      }
    } else {
      note.add(new Note("Je n'ai rien pour lui malheureusement"))
    }
    return false
  }
}
