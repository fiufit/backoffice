FROM node:19-alpine

WORKDIR /usr/fiufit/backoffice

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve

CMD serve -s dist -l 3000
