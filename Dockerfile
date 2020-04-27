FROM node:13-alpine

ENV NODE_ENV production
WORKDIR /app-home/app
COPY package.json /app-home/app/package.json

RUN npm install
EXPOSE 5668

COPY . /app-home/app
USER node
CMD ["npm", "start"]