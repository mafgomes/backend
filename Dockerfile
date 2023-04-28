FROM node:14

COPY . /usr/local/app
RUN apt update && apt install -y nodejs

CMD node /usr/local/app/server.js
