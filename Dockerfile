FROM node:16.17

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3010

CMD [ "npm", "start" ]
