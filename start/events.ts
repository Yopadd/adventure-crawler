import emitter from '@adonisjs/core/services/emitter'

emitter.on('db:query', function (query) {
  console.debug(query.sql)
})
