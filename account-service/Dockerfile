FROM node:18-alpine
ADD . /app
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

COPY . .

RUN npm install
EXPOSE 4001
CMD ["npm","run","dev"]
