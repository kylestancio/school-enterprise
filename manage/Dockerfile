FROM node:16.15-alpine

WORKDIR /app/manage

COPY package.json /app/manage/
RUN npm i

COPY . /app/manage/
EXPOSE 3000

CMD ["npm", "run", "dev"]