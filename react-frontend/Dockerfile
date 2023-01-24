#FROM node:16.8.0 as BUILDER
#WORKDIR '/app'
#COPY package.json ./
#RUN npm install
#COPY ./ ./
#RUN npm run build
#
#FROM nginx
#
#COPY --from=BUILDER /app/build /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY default.conf /etc/nginx/conf.d/default.conf
#CMD ["nginx", "-g", "daemon off;"]


# Stage 1
FROM node:16.8.0  as react-build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]