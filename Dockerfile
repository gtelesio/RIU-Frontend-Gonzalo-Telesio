FROM node:20-alpine as build
WORKDIR /app
COPY package.json yarn.lock ./
COPY angular.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tsconfig.spec.json ./
COPY src ./src
RUN yarn install --frozen-lockfile
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/dist/super-heroes-app/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 