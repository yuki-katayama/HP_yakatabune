FROM node:16.13.2-alpine

EXPOSE 3000
ENV HOST 0.0.0.0

# コマンド実行
RUN apk update && \
    apk upgrade && \
    apk add git && \
    npm install -g npm@latest nuxi nuxt3