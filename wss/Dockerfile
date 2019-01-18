FROM node:11

RUN mkdir /code

WORKDIR /code

ADD package.json /code/
RUN npm install

ADD . /code/
