'use strict'

const path = require('path')
const fp = require('fastify-plugin')

const isLocalPlugin = filename => filename && ['.', '/'].indexOf(filename[0]) !== -1

const loadPlugin = async (fastify, opts, basepath, filename) => {
  let pluginFilename = filename
  let pluginOpts = { ...opts }

  if (typeof filename !== 'string') {
    const [_filename, _options] = filename
    pluginFilename = _filename
    pluginOpts = {
      ...pluginOpts,
      ..._options
    }
  }

  const pluginPath = isLocalPlugin(pluginFilename)
    ? path.join(basepath, pluginFilename)
    : pluginFilename

  try {
    await fastify.register(require(pluginPath), pluginOpts)
    fastify.log.info(`Plugin '${pluginPath}' loaded`)
    if (Object.keys(pluginOpts || {}).length > 0) {
      fastify.log.debug(`Plugin options: ${JSON.stringify(pluginOpts)}`)
    }
  } catch (err) {
    fastify.log.error(`Plugin '${pluginPath}' loading failed!`)
    fastify.log.error(`${err.message}`)
    throw err
  }
}

module.exports = fp(async (fastify, opts, next) => {
  const {
    basepath,
    plugins,
    ...globalOpts
  } = opts
  const _plugins = plugins || []

  for (let i = 0; i < _plugins.length; ++i) {
    const filename = _plugins[i]
    try {
      await loadPlugin(fastify, globalOpts, basepath, filename)
    } catch (err) {
      next(err)
    }
  }

  next()
})
