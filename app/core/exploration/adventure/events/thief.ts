import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Thief extends EventBase<Player> {
  constructor() {
    super('Thief', 'Au voleur !')
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('weapon')) {
      note.add(new Note("J'ai de quoi me défendre !", 1))
    } else {
      player.backpack.empty()
      note.add(new Note("Je n'ai rien pu faire il m'a tout pris !", 0))
    }
    return false
  }
}
