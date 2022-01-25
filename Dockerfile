FROM node:10 as build

WORKDIR /app

COPY ./package*.json ./

RUN npm install --loglevel verbose 

COPY ./src ./src
COPY ./*.json ./

RUN npm run build 



FROM nginx:1.19.3

COPY ./docker/nginx.conf /etc/nginx/nginx.conf.tpl
COPY ./docker/start.sh /app/start.sh

COPY --from=build /app/dist /www/ste

CMD ["sh", "-c", "/app/start.sh"] 
