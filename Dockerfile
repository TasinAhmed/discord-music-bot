FROM node:16-alpine

WORKDIR /app

COPY package.json /app/package.json

RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

COPY . /app

CMD ["npm", "start"]