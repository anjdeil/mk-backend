
# Installing dependencies:
FROM node:18-alpine AS install-dependencies

WORKDIR /user/src/app
 
COPY package.json package-lock.json ./

# building bcrypt
RUN apk add --no-cache make gcc g++ python3 lame && \
    npm ci --ignore-scripts --omit=dev && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++
    
RUN npm install sequelize-cli
RUN npm install dotenv


COPY . .


# Creating a build:
FROM node:18-alpine AS create-build
 
WORKDIR /user/src/app
 
COPY --from=install-dependencies /user/src/app ./
 
RUN npm run build
 
USER node

 
# Running the application:
FROM node:18-alpine AS run

ARG NODE_ENV
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG DB_HOST
ARG DB_PORT

WORKDIR /user/src/app

RUN apk add --no-cache lame

COPY --from=install-dependencies /user/src/app/src/database ./src/database
COPY --from=install-dependencies /user/src/app/.sequelizerc .sequelizerc

COPY --from=install-dependencies /user/src/app/node_modules ./node_modules
COPY --from=create-build /user/src/app/dist ./dist

COPY package.json ./

RUN npx sequelize-cli db:migrate:status
RUN npx sequelize-cli db:migrate
 
CMD ["npm", "run", "start:prod:logs"]