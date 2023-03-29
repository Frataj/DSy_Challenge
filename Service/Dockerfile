FROM node:19-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 3033

# RUN npm run build

CMD [ "node", "index.js" ]