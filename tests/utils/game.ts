import { game, repositories } from '#app/core/game'
import Adventure from '#app/core/install/adventure/adventure'
import { Events } from '#app/core/install/event/events'
import InstallItemsUseCase from '#app/core/install/use-cases/install-items.use-case'
import sinon from 'sinon'

async function install() {
  await repositories.install.adventureRepository.createMany([
    new Adventure('Aazzidy', [
      Events.Collector(),
      Events.Thief(),
      Events.Wolfs(2),
      Events.FireCamp(),
      Events.CrossingLavaRiver(),
      Events.Dragon(),
    ]),
  ])
  await new InstallItemsUseCase(repositories.install.itemRepository).apply()
}

export function testInstaller() {
  sinon.replace(game, 'install', install)
}
