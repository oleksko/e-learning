FROM node:16.8.0 as BUILDER
WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx

COPY --from=BUILDER /app/build /usr/share/nginx/html
