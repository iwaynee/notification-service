FROM node:16

# Create app directory
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN ls /usr/app -a

EXPOSE 3010

CMD ["npm", "start"]
