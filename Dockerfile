FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY ./build ./build

CMD ["npm", "run", "start"]
