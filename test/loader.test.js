const t = require('tap')
const Fastify = require('fastify')

function buildFastify (t) {
  const fastify = Fastify({ logger: false })
  t.tearDown(() => fastify.close())
  return fastify
}

t.test('fastify-plugin-loader', async t => {
  t.test('without options', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../loader'))
      t.ok(true, 'should not throw any error')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('with only a basepath', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../loader'), {
        basepath: __dirname
      })
      t.ok(true, 'should not throw any error')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('with a list of plugin filenames', async t => {
    t.plan(2)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../loader'), {
        basepath: __dirname,
        plugins: [
          './plugins/example2',
          './plugins/example1'
        ]
      })
      t.true(fastify.example1 && fastify.example2, 'should load all plugins in the list')
      t.true(fastify.example1 > fastify.example2, 'should load plugins according to the given order')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('passing plugin options', async t => {
    t.plan(2)
    const fastify = buildFastify(t)
    const opts = {
      key: 3
    }
    try {
      await fastify.register(require('../loader'), {
        basepath: __dirname,
        plugins: [
          ['./plugins/example3', opts]
        ]
      })
      t.true(fastify.example3, 'should load the plugin')
      t.deepEqual(fastify.example3, opts, 'should pass the specified options to the plugin')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('passing global and plugin options', async t => {
    t.plan(2)
    const fastify = buildFastify(t)
    const opts = {
      key1: 3
    }
    const globals = {
      key2: 5
    }
    try {
      await fastify.register(require('../loader'), {
        basepath: __dirname,
        plugins: [
          ['./plugins/example3', opts]
        ],
        ...globals
      })
      t.true(fastify.example3, 'should load the plugin')
      t.deepEqual(fastify.example3, { ...opts, ...globals }, 'should pass merged options to the plugin')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('with failing plugins', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../loader'), {
        basepath: __dirname,
        plugins: [
          './plugins/example2',
          './plugins/example1',
          './plugins/example4'
        ]
      })
      t.fail('should throw an error')
    } catch (err) {
      t.true(err, 'should throw an error')
    }
  })

  t.test('with global plugins', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../loader'), {
        basepath: __dirname,
        plugins: [
          'fastify-sensible',
          './plugins/example2'
        ]
      })
      t.true(fastify.example2 && fastify.httpErrors, 'should load both global and local plugins in the list')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })

  t.test('passing an external JSON', async t => {
    t.plan(1)
    const fastify = buildFastify(t)
    try {
      await fastify.register(require('../loader'), {
        basepath: __dirname,
        plugins: require('./plugins.json')
      })
      t.true(fastify.example1 && fastify.example2 && fastify.example3 && fastify.httpErrors, 'should load all plugins in the list')
    } catch (err) {
      console.log(err)
      t.error(err, 'should not throw any error')
    }
  })
})
