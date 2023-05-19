FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm build

EXPOSE 3010

CMD ["npm", "run", "start"]
