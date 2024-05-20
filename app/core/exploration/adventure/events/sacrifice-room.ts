import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'

export default class SacrificeRoom extends EventBase<Player> {
  constructor() {
    super(
      'Sacrifice Room',
      'Une salle éclairé par quelques rayons lumières que laisse passer des trous dans le plafond, au centre une table en pierre, dans un coin de pièce une chèvre semble vivre ici depuis un moment'
    )
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('goat', 'sacrifice', 'magic', 'weapon')) {
      note.add(
        new Note(
          "En sacrifiant les chèvres, elles émient un cri des enfers avant de disparaître dans un tas de cendre. Leurs sangs s'agglutinas pour former une créature à l'apparence humaine avant de s'effondrer au sol pour ne former qu'une énorme flaque de sang, je crois bien avoir tué un démon",
          666
        )
      )
      return false
    }
    if (player.hasTag('sacrifice', 'magic', 'weapon')) {
      note.add(
        new Note(
          "En sacrifiant la chèvres avec une arme magique, elle émit un cri des enfers avant de disparaître dans un tas de cendre. Je ne sais pas exactement ce que j'ai fais mais certainement une bonne action...",
          10
        )
      )
      return false
    }
    note.add(new Note("Ne sachant pas quoi faire, j'ai libéré la chèvre", 1))
    player.backpack.add(Items.Goat, () => {
      note.add(
        new Note(
          'Je ne peux malheureusement pas la prendre avec moi, je vais la laisser faire ça vie'
        )
      )
    })
    return false
  }
}
