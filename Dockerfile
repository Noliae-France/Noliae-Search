FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css app.js /usr/share/nginx/html/
COPY config.js.template /usr/share/nginx/html/config.js.template
ENV NOLIAE_API_BASE=http://localhost:8080
CMD ["/bin/sh", "-c", "envsubst '$$NOLIAE_API_BASE' < /usr/share/nginx/html/config.js.template > /usr/share/nginx/html/config.js && exec nginx -g 'daemon off;'"]
