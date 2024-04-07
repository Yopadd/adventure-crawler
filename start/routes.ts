/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
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
