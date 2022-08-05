FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
COPY ../client/build ./client/build
RUN npm i
CMD [ "npm", "run", "start" ]
