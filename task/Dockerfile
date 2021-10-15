FROM node:10.19.0

# optional: rename working directory
WORKDIR /app
COPY package.json .
# install dependencies inside of conainer:
RUN npm install 
# copy all other files
COPY . .

# runing all this code on command
CMD npm run start:dev 


