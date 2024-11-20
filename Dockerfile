# Use Node.js as the base image for building
FROM node:16-alpine as build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

# Use NGINX as the web server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
