# Use Node.js Alpine as the base image for building the app
FROM node:16-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies and clean up the cache to reduce the size
RUN npm install --production && \
    npm cache clean --force

# Copy the rest of the application code
COPY . .

# Build the React app for production and Clean up unneeded files
RUN npm run build && \
    rm -rf /app/src /app/node_modules /app/package.json /app/package-lock.json  

# Use NGINX to serve the built app
FROM nginx:alpine

# Copy the build output to the NGINX directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world (NGINX default)
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
