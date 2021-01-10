# Wheather App with angular

This is test Weather app developed using Angular using third parties web api.

## Get started

### Clone the repo

```shell
git clone https://github.com/y-chen/weather-app
cd weather-app
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
npm start
```

The `npm start` command builds (compiles TypeScript and copies assets) the application into `dist/`, watches for changes to the source files, and runs `lite-server` on port `3000`.

Shut it down manually with `Ctrl-C`.

#### npm scripts

These are the most useful commands defined in `package.json`:

* `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
* `npm run build` - runs the TypeScript compiler and asset copier once.
* `npm run eslint:fix` - runs `eslint` on the project files and fixes problems when possibile.
* `npm run prettier:write` - runs `prettier` on the project files and formats them.

These are the test-related scripts:

* `npm test` - Runs tests.
* `npm run coverage` - Runs tests and shows code coverage info.
* `npm run coverage:web` - Runs tests and `http-server` from coverage folder to show info from generated web site.

#### Environments

There are two environments (staging and production), both hosted on `Firebase` at these addresses:

* [Staging](https://ng-weather-app-staging.web.app)
* [Production](https://ng-weather-app-prod.web.app)

A new deploy in **staging** has been done every time a push in `master` happens.

These are the environments-related scripts:

* `npm run deploy:staging` - Deploys in **staging**.
* `npm run deploy:prod` - Deploys in **production**
