FROM nginx:1.24.0

COPY ./letsencrypt  /etc/letsencrypt
COPY ./mozbra.conf  /etc/nginx/conf.d/
RUN    rm           /etc/nginx/conf.d/default.conf

RUN apt update && apt install -y certbot python3-certbot-nginx
