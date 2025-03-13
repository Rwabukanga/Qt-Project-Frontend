# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the React app using a simple web server
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
