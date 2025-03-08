import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class WizardHunt extends EventBase<Player> {
  constructor() {
    super('Wizard hunt', 'Un village')
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    note.add(
      new Note(
        "Il y avait un grand bûcher au milieu d'un village, où ils pratiquaient la chasse aux sorciers"
      )
    )
    if (player.hasTag('stealth', 'magic') || player.hasTag('stealth', 'potion')) {
      note.add(new Note("En restant discret, je n'avais rien à craindre", 1))
      const magicCount = player.countTag('magic')
      const potionCount = player.countTag('potion')
      if (magicCount + potionCount > 1) {
        note.add(
          new Note("Mais j'ai quand même abandonné quelques items pour ne pas me faire attraper")
        )
        if (potionCount >= magicCount) {
          player.backpack.removeAllFromTag('potion')
        } else {
          player.backpack.removeAllFromTag('magic')
        }
      }
      return Resolution.Continue
    }
    if (player.hasTag('potion', 'magic')) {
      note.add(
        new Note("Ils ont trouvé du matériel de sorcier dans mes affaires, c'est fini pour moi !")
      )
      return Resolution.EndOfAdventure
    } else {
      note.add(new Note('Je me suis reposé à la taverne du coin avant de repartir'))
      return Resolution.Continue
    }
  }
}
