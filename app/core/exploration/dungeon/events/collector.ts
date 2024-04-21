import EventBase from '#app/core/exploration/dungeon/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Collector extends EventBase<Player> {
  constructor() {
    super('Collector', "Un collectionneur, il doit pouvoir m'acheter quelque broutilles")
  }

  public resolve(player: Player): Note {
    const moneyCount = player.countTag('money')
    if (moneyCount > 0) {
      return new Note(`Il est intéressé par mes ${moneyCount} objets de valeurs`, moneyCount)
    }
    return new Note("Je n'ai rien pour lui malheureusement")
  }
}
