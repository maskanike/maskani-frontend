# Maskani Frontend in VueJS

[![Author](http://img.shields.io/badge/author-@maskani_co_ke-blue.svg?style=flat-square)](https://twitter.com/maskani_co_ke)

## About Maskani

Maskani is a web portal to help landlords and agents manage their propery with ease. You can 

-   Invoice tenants
-   Receipt tenants
-   Get business insights
-   Keep an up to date database of tenants

### Install yarn dependencies after installing

```bash
cd myproject
yarn install
yarn update
```

## VERY IMPORTANT

This project uses Vue Router HTML5 History Mode, this means when you are in development mode you can hit Cmd+R (mac) or F5 (Windows) to reload the page and it will work, but when the project is built you will have problems, so will need to do a small change in your web server to make that work. Please read the official Vue Router documentation here: <https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations>

### Compiles and hot-reloads for development

```bash
yarn run serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Run your tests

```bash
yarn test
```

### Lints and fixes files

```bash
yarn lint
```

### Formatting markdown files

```bash
yarn remark
```

### Run your end-to-end tests

```bash
yarn test:e2e
```

### Run your unit tests

```bash
yarn test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
