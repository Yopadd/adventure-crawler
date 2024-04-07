/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const PreparationController = () => import('#controllers/preparation_controller')
const ScoreBoardController = () => import('#controllers/score_board_controller')
const ExploreDungeonController = () => import('#controllers/explore_dungeon_controller')
const InscriptionController = () => import('#controllers/inscription_controller')
const InstallController = () => import('#controllers/install_controller')

router.post('/install', [InstallController])

router.post('/inscription', [InscriptionController])

router.post('/exploration/dungeons/:name', [ExploreDungeonController]).use(
  middleware.auth({
    guards: ['basic'],
  })
)

router
  .group(() => {
    router.get('/dungeons', [PreparationController, 'getDungeons'])
    router.get('/items', [PreparationController, 'getItems'])

    router
      .group(() => {
        router.post('/backpack', [PreparationController, 'addItems'])
        router.get('/backpack', [PreparationController, 'openBackpack'])
      })
      .prefix('/player')
      .use(
        middleware.auth({
          guards: ['basic'],
        })
      )
  })
  .prefix('/preparation')

router.get('/score-board', [ScoreBoardController])
