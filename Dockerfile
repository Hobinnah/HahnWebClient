
FROM node:12.16.0 AS compile-image
COPY . ./hahnWebClient
WORKDIR /hahnWebClient
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /test-application/dist/test-application/ /usr/share/nginx/html

#docker build --rm -t hahnWebClient:latest
