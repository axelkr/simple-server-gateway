# image setup
FROM node:10
RUN apt-get update

# built microservice from scratch
WORKDIR /usr/src/app/
RUN git clone https://github.com/axelkr/simple-server-gateway.git gateway
WORKDIR /usr/src/app/gateway
RUN npm install
RUN npm run build

# configure microservuce
WORKDIR /usr/src/app/
COPY ./config.gateway.json gateway/config.json

# run microservice
EXPOSE 3000
WORKDIR /usr/src/app/gateway
CMD [ "node", "./dist/bundle.js" ]