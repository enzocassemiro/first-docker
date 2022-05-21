FROM node:latest

WORKDIR /

COPY . .

RUN npm install

EXPOSE 3013

ENTRYPOINT ["node", "index.js"]