FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build:ssr

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
EXPOSE 3002
ENTRYPOINT ["docker-entrypoint.sh"] 