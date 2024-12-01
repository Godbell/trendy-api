FROM node:20

WORKDIR /server

COPY ./ ./

RUN npm install

CMD npm run start