## Docker + Docker  compose

DO not forget to create `.env` and copy there envs from `.env-example`

[Install docker](https://docs.docker.com/engine/install/)

To start with docker
```bash 
$ docker-compose -f docker-compose.dev.yml up
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run tests

# e2e tests
$ npm run tests:e2e

# tests coverage
$ npm run tests:cov
```

