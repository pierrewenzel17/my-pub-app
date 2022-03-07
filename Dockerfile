FROM node:lts-alpine as Build
WORKDIR /app
RUN npm install -g @angular/cli 
RUN ng config -g cli.packageManager yarn
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=Build /app/dist/my-pub-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]