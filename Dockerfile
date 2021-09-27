FROM node:16-alpine

WORKDIR /app

ENV TOKEN=ODg3OTM5ODM0Nzg4ODM5NDU1.YULcaQ.EWPwWyrV9CARjnzmzOlByjDphTg
ENV CLIENT_ID=887939834788839455
ENV SONG_LINK=https://www.youtube.com/watch?v=_8Gx6AFMJ9U

COPY package.json /app/package.json

RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

COPY . /app

CMD ["npm", "start"]