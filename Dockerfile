FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN ls /usr/src/app/build

EXPOSE 3010

ENV NODE_ENV=production

CMD [ "node", "build/app.js" ]

