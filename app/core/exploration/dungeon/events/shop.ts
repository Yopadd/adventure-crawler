import EventBase from '#app/core/exploration/dungeon/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Shop extends EventBase<Player> {
  constructor() {
    super('Shop', 'Une des meilleurs boutiques de la ville avant de partir en mission')
  }

  public resolve(player: Player): Note {
    const moneyCount = player.countTag('money')
    if (moneyCount > 0) {
      return new Note(`Avec mes ${moneyCount} objets de valeur`, moneyCount)
    }
    return new Note("Je n'ai rien pour acheter quoi que ce soit", moneyCount)
  }
}
