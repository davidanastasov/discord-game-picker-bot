FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json yarn.lock ./
RUN yarn

# Bundle app source
COPY . .

# Start app
CMD [ "node", "bot.js" ]