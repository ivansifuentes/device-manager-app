FROM node:18-alpine
ADD . /app
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

COPY . .

RUN npm install
EXPOSE 4002
CMD ["npm","run","dev"]
