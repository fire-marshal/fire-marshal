FROM node:10

RUN mkdir /code
RUN mkdir /common
RUN mkdir /statis

WORKDIR /code

ADD package.json /code/
RUN npm install

# link main deps to all bind libs
RUN ln -sv /code/node_modules /common/node_modules
RUN ln -sv /code/node_modules /static/node_modules

ADD . /code/
