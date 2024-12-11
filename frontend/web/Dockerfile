# Build stage
FROM node:18 as build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the web code
COPY . .

# # Copy shared code
# COPY ../shared ./src/shared

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]