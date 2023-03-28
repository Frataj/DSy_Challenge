FROM node:19-alpine as build
WORKDIR /app
COPY . .

# Prepare nginx
FROM nginx:latest
COPY --from=build /app /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]