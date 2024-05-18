import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'

export default class GoldOffering extends EventBase<Player> {
  constructor() {
    super('Gold Offering', 'Une énorme soucoupe en or maintenue par de grandes chaînes')
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('gold')) {
      const goldCount = player.countTag('gold')
      if (goldCount < 6) {
        note.add(
          new Note(
            "J'ai déposé tout mes en objets en or, rien ne se passe. J'ai quand même un sentiment d'accomplissement mais je pense qu'il reste des choses à faire ici",
            goldCount
          )
        )
      } else {
        note.add(
          new Note(
            "Quand j'ai déposé tous mes objets en or la soucoupe c'est mise à briller de mille feu, quand la lumière c'est atténuée mes objets avez disparu, une dague à la lame rouge est apparue à la place",
            goldCount
          )
        )
        player.backpack.removeAllFromTag('gold')
        EventBase.addToBackpack(player, Items.SacrificeDague, () => {
          note.add(
            new Note("Je n'ai malheureusement pas de place pour emporter cette dague avec moi")
          )
        })
      }
    } else {
      note.add(new Note("J'ai essayer de déposé des objets dans la soucoupe mais rien ne se passe"))
    }
    return false
  }
}
