
# Use Node.js as the base image for building the app
FROM node:16-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY ./package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use NGINX to serve the built app
FROM nginx:alpine

# Copy the build output to the NGINX directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world (NGINX default)
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]