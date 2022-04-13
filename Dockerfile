FROM node:16

EXPOSE 3000

WORKDIR /src

RUN npm install i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm set timeout = 150000

RUN npm install

COPY . .

CMD [ "npm", "start" ]