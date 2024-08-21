# Project setup

First of all you should have [docker](https://www.docker.com/). Please install to your PC if you don't have.

Copy .env file from [s3](https://s3.console.aws.amazon.com/s3/object/music-market-config?region=eu-north-1&prefix=env_backend_example)

If you want to use local db please chage variables in `.env` 
for variables from 
```bash
docker-compose.dev.yaml
```
By default in bucket file set production db credentials.

Install packages 

```bash
$ npm install
```

## Database
To deploy local db do next command.
```bash
$ docker-compose -f docker-compose.dev.yaml up
```
There you can find __Adminer__ quite usefull tool to manage database. And also postgre db, and redis. 

After that we should actualize db so we need to do migrations and seeders. For this you need to instal [Sequelize CLI](https://sequelize.org/docs/v7/cli/). In app directory do migration screepts.
### Do not forget to check your environment

```bash
$ npx sequelize-cli db:migrate
```
```bash
$ npx sequelize-cli db:seed:all
```
### Now database in actual version, any changes related to db should be provided as migrations or seeders