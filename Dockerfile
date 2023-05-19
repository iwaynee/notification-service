FROM node:16.17

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

RUN npm run build
EXPOSE 3010

CMD [ "npm", "start" ]
