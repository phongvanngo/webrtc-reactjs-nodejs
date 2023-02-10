FROM node:14.17.1 as build
WORKDIR /
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

ARG REACT_APP_BASE_URL 
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
