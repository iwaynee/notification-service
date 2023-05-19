FROM node:16.17
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
EXPOSE 3010

CMD [ "npm", "start" ]
