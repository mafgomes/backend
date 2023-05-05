FROM node:18

COPY . /usr/local/app
RUN rm -rf .git* .env || true
RUN apt update && apt install -y nodejs

CMD node /usr/local/app/server.js
