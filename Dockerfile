FROM node:16-alpine

WORKDIR /var/www

COPY package*.json .

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 3000

COPY ./docker/entrypoint.sh /home/entrypoint.sh

RUN chmod +x /home/entrypoint.sh

CMD ["sh", "/home/entrypoint.sh"]