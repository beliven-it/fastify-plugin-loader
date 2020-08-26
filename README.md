# fastify-plugin-loader

A plugin to register an ordered list of plugins (e.g. from a JSON file)

![Node.js CI](https://github.com/heply/fastify-plugin-loader/workflows/Node.js%20CI/badge.svg)

## Why?

The official [fastify.-autoload](https://github.com/fastify/fastify-autoload) plugin allows devs to load all plugins stored in a specific folder.

The main issue with this approach is that it's nearly **impossible** to:

- define a **specific loading order**
- **passing configuration options** to loaded plugins

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
| `plugins`           | The ordered list of plugin filenames to load (or `[filename, opts]` tuples).                       |

**NOTE:** additional options are forwarded to **all** loaded plugins (and merged with plugin's local options, if provided).

## Test

```bash
$ npm test
```

## Acknowledgements

This project is kindly sponsored by:

[![heply](https://raw.githack.com/heply/brand/master/heply-logo.svg)](https://www.heply.it)

## License

Licensed under [MIT](./LICENSE)
