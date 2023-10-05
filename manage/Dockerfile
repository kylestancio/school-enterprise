FROM node:16.15-alpine

WORKDIR /app/manage

RUN npm i -g dotenv-cli

COPY package.json /app/manage/
COPY prisma /app/manage/prisma/
RUN npm i

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET ${NEXTAUTH_SECRET}

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL ${NEXTAUTH_URL}

ARG NEXT_PUBLIC_URL
ENV NEXT_PUBLIC_URL ${NEXT_PUBLIC_URL}

RUN npx prisma generate

COPY . /app/manage/

EXPOSE 3000

CMD ["npm", "run", "dev"]