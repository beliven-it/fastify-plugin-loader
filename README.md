# fastify-plugin-loader

A plugin to register a ordered list of plugins (e.g. from a JSON file)

## Install

```bash
$ npm i --save fastify-plugin-loader
```

## Usage

```js
fastify.register(require('fastify-plugin-loader'), {
  basepath: __dirname,
  plugins: [
    'fastify-cors',
    'fastify-sensible',
    ...
    './plugins/example-plugin',
    ['./plugins/another-plugin', {
      option1: 'value',
      ...
    }]
  ]
)
```

You can also load them from an external JSON (or JS) file:

```js
fastify.register(require('fastify-plugin-loader'), {
  basepath: __dirname,
  plugins: require('./plugins.json')
)
```

## Options

When registering the plugin in your app, you can pass the following options:

| Name                | Description                                                         |
|---------------------|---------------------------------------------------------------------|
| `basepath`          | The reference root path to consider when resolving `.` or `..`      |
| `plugins`           | The ordered list of plugin filenames to load.                       |

## Test

```bash
$ npm test
```

## Acknowledgements

This project is kindly sponsored by:

[![heply](https://raw.githack.com/heply/brand/master/heply-logo.svg)](https://www.heply.it)

## License

Licensed under [MIT](./LICENSE)
