import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class WizardHunt extends EventBase<Player> {
  constructor() {
    super('Wizard hunt', 'Un village')
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    note.add(
      new Note(
        'Il y a un grand bûcher au milieux du village, ils pratiquent la chasse aux sorciers'
      )
    )
    if (player.hasTag('stealth', 'magic') || player.hasTag('stealth', 'potion')) {
      note.add(new Note("En restant discret je n'ai rien à craindre", 1))
      const magicCount = player.countTag('magic')
      const potionCount = player.countTag('potion')
      if (magicCount + potionCount > 1) {
        note.add(
          new Note('Mais je vais quand même abandonner quelques items pour ne pas faire attraper')
        )
        if (potionCount >= magicCount) {
          player.backpack.removeAllFromTag('potion')
        } else {
          player.backpack.removeAllFromTag('magic')
        }
      }
      return false
    }
    if (player.hasTag('potion', 'magic')) {
      note.add(
        new Note("Ils ont trouvé du materiel de sorcier dans mes affaires, c'est fini pour moi !")
      )
      return true
    }
    return false
  }
}
