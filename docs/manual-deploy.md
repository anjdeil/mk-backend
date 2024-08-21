# Manual deploy and connect to remote server
bash `$ ssh -i "Key.pem" ${ec2.server.url}`

This command will open ec2 console. Application deployment have done with docker: https://www.docker.com/

bash `sudo su` - we need to be a super user
then we should go to `$ ~/usr/src/app` for both front and back

```bash 
`$ git pull origin main` 
``` 
Just fetch last master branch
```bash 
$ docker-compose down
```

## Database
After that we should actualize db so we need to do migrations and seeders. For this you need to instal [Sequelize CLI](https://sequelize.org/docs/v7/cli/). In app directory do migration screepts.
### Do not forget to check your environment

```bash
$ npx sequelize-cli db:migrate
```
```bash
$ npx sequelize-cli db:seed:all
```

```bash 
$ docker-compose up --build --d
``` 

### Do not forget to pass eslint before deploy!!!!!!

Congratulations you successfuly deployed app!
