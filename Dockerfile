FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

RUN npm prune --production

COPY . .

CMD ["npm", "start"]