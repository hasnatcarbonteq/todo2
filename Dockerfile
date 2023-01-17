FROM node:alpine as development

# Create app directory
WORKDIR /usr/src/todo

# Install app dependencies
COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:slim as production

# Create app directory
WORKDIR /usr/src/todo

# Install app dependencies
COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=development /usr/src/todo/build ./build

EXPOSE 8080
CMD [ "node", "./build/CLI/www.js" ]