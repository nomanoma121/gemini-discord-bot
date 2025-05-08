FROM node:24.0.0-alpine3.20
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY config.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
