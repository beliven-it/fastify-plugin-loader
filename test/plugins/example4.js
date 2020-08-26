'use strict'

const fp = require('fastify-plugin')

module.exports = fp((fastify, opts, next) => {
  next(new Error())
})
