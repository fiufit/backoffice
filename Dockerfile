FROM node:19-alpine AS builder
WORKDIR /usr/fiufit/backoffice
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.4-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=builder /usr/fiufit/backoffice/dist .
CMD [ "nginx", "-g", "daemon off;" ]
