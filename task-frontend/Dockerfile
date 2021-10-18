FROM node:10.19.0

WORKDIR /app

COPY package.json ./ 

RUN yarn add

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]`


