FROM node:16.17

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json /usr/src/app/
RUN npm install

COPY . .

RUN npm run build
EXPOSE 3010

CMD [ "npm", "start" ]
