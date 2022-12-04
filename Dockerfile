FROM node:16.15.1

ENV PORT = 3000

EXPOSE 3000

WORKDIR /app

COPY "package.json" .

RUN yarn

RUN yarn add db-migrate-pg

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["yarn", "dev"]

