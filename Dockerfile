FROM node:16-alpine

WORKDIR /var/www

COPY package*.json .

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "dev"]