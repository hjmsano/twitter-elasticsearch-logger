FROM node:10-alpine

RUN mkdir /var/app
WORKDIR /var/app
ADD . /var/app
RUN npm install

CMD node /var/app/main.js
