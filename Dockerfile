FROM node:16-alpine

WORKDIR /var/www

COPY package*.json .

RUN npm install -g next pnpm

RUN npm install

EXPOSE 3000

CMD ["next", "dev"]