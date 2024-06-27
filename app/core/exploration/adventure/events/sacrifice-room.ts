import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Items } from '#app/core/install/item/items'

export default class SacrificeRoom extends EventBase<Player> {
  constructor() {
    super(
      'Sacrifice Room',
      'Une salle éclairée par quelques rayons de lumière qui passent à travers des trous dans le plafond. Au centre, une table en pierre, et dans un coin de la pièce, une chèvre semble vivre ici depuis un moment'
    )
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.hasTag('goat', 'sacrifice', 'magic', 'weapon')) {
      note.add(
        new Note(
          "En sacrifiant les chèvres, elles émettent un cri des enfers avant de disparaître dans un tas de cendres. Leur sang s'agglutina pour former une créature à l'apparence humaine avant de s'effondrer au sol pour ne former qu'une énorme flaque de sang. Je crois bien avoir tué un démon",
          666
        )
      )
      return false
    }
    if (player.hasTag('sacrifice', 'magic', 'weapon')) {
      note.add(
        new Note(
          "En sacrifiant la chèvre avec une arme magique, elle a émis un cri des enfers avant de disparaître dans un tas de cendres. Je ne sais pas exactement ce que j'ai fait, mais c'était certainement une bonne action...",
          10
        )
      )
      return false
    }
    note.add(new Note("Ne sachant pas quoi faire, j'ai libéré la chèvre", 1))
    player.backpack.add(Items.Goat, () => {
      note.add(
        new Note(
          'Je ne pouvais malheureusement pas la prendre avec moi, je vais la laisser faire sa vie'
        )
      )
    })
    return false
  }
}
