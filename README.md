# service-finder-api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Introduction
This API is an experiment on user and business management with authentication and access/permission logic.

## How to run this project:
There are three ways to run this project. The first way is the easiest but doesn't provide development flexibility. The second is also fairly easy but requires some environment setup and is more flexible for development. The last is a mix of the first two steps but doesn't require running psql on the host machine and doesn't require environment setup.

Some basic working knowledge of the following software is needed to make this project work:
- Docker - composing/networking/etc...
- Git
- node/npm/yarn
- postgres/sql

## 1. The Docker way
`docker-compose up` - This command launches two services using docker ([get docker](https://docs.docker.com/get-docker/)). One is from a simple [postgres image](https://hub.docker.com/_/postgres) available from [Dockerhub](https://hub.docker.com/) and the other is from a generated image using the local [Dockerfile](./Dockerfile) and source of this project. *The Docker way* is primarily for deployment but can be setup to mirror a folder as a volume within the app image for local development. Once the instances boot up go to [http://localhost:3000](http://localhost:3000)

There may be times when `docker-compose up` uses an old image even though you have just built a new image to use. In such cases simply run the following: `docker-compose up --build api db`. This will build the image before `docker-compose` fires it `up`. It seems redundant but it works.

## 2. The Native/Local way
This API/Project relies on a (postgres) DB instance to be running so you have to set one up somewhere. Be it through docker (as mentioned above) or locally or somewhere remote. When setting up your (postgres) DB instance the [datasource](src/datasources/servicefinder.datasource.ts) file contains default env variables that are used for connecting to the DB. You can set your local/remote postgres instance with these (or other) values for your project:
```
{
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'pass',
  database: 'service-finder',
}
```
Once you have a DB up and running execute the following command:
- `npm install` or `yarn install`
- `npm start` or `yarn start`
- open your browser to [http://localhost:3000](http://localhost:3000)

## 3. The Docker/Native way
This way is a combination of [1. The Docker way](#1.-the-docker-way) and [2. The Native/Local way](#2.-the-native/local-way)

Execute the following commands:
- `npm install` ore `yarn install`
- `docker-compose -f docker-compose.db.yml up`
- Open a new terminal tab/window
- `npm start` or `yarn start`
- open your browser to [http://localhost:3000](http://localhost:3000)
