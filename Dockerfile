FROM node:18
RUN mkdir -p /src/user/app
WORKDIR /src/user/app
COPY package*json ./
COPY . .
RUN npm i
CMD ["node", "app.js"]