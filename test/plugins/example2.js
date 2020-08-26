'use strict'

const fp = require('fastify-plugin')

module.exports = fp((fastify, opts, next) => {
  fastify.decorate('example2', new Date())

  next()
})
