FROM node:22.15.1

WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install


COPY . .

CMD ["node", "server.js"]