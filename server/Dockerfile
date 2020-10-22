FROM node:alpine

WORKDIR /smart_gallery

COPY ./package.json ./

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

COPY . .

CMD ["npm", "run", "start"]