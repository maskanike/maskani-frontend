#build stage
FROM node:12-alpine as build-stage
WORKDIR /app
ARG VUE_APP_API_URL
ARG VUE_APP_MIXPANEL_TOKEN
ARG VUE_APP_DRIFT_TOKEN
ADD application/package.json application/yarn.lock /app/
RUN yarn && yarn cache clean;
ADD application /app
RUN yarn build

FROM nginx:1.22.1-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
