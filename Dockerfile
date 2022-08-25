FROM nginx:1.23.1

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY build /opt/dist