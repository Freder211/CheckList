FROM node:lts-alpine3.12 as build

WORKDIR /frontendCL 

COPY package.json /frontendCL/package.json

RUN npm install

COPY . /frontendCL

RUN npm run build



FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontendCL/dist /usr/share/nginx/html