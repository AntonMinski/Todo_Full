FROM node:10.19.0

# optional: rename working directory
WORKDIR /app
COPY package.json ./
# install dependencies inside of conainer:
RUN npm install 
# copy all other files
COPY . .

EXPOSE 8000

# runing all this code on command
CMD [ "npm", "run", "start:dev" ]
# CMD npm run start:dev 


