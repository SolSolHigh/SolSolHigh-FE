FROM node:18 as build-stage
WORKDIR /src
COPY package*.json ./

ARG API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /src/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]