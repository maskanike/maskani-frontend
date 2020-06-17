#build stage
FROM node:12-alpine as build-stage
WORKDIR /app
ARG VUE_APP_API_URL
ARG VUE_MIXPANEL_TOKEN
ADD application/package.json application/yarn.lock /app/
RUN yarn && yarn cache clean;
ADD application /app
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
