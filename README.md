Front End i use : React Js 

The frontend is designed to interact with the backend APIs for user authentication, URL shortening, and analytics. It includes form validation, user-friendly UI components, and API integration.

1. Authentication Pages (Login & Register)

User Registration:

Form validation for username, email, and password.

Sends a POST request to /api/auth/register.

User Login:

Form validation for username and password.

Sends a POST request to /api/auth/login.

Stores the access token securely for API requests.

3. Landing Page
   
A simple, clean webpage similar to Bitly.

Focuses on user experience but doesn’t need all Bitly features (e.g., hover menus).

5. Dashboard (Authenticated Users Only)

Displays a list of shortened URLs created by the user.

Allows users to manage (edit/delete) their URLs.

Integrates with /api/urls to fetch and display user-specific URLs.

7. URL Shortening Page

Input field for pasting the original URL.

"Shorten" button triggers a POST request to /api/urls.

Displays the shortened URL with a copy button for quick access.

9. URL Analytics Page
   
Shows click counts and usage statistics for each shortened URL.

Fetches data from /api/urls/{id}/analytics.

Displays stats in a clean and readable format.



API Consumption

The frontend consumes different APIs for authentication, URL management, and analytics.

Access token is included in API requests for authentication.

Uses React/Vue with MUI/Vuetify for UI design.

I implemented Docker and Docker Composee:

Dockerfile:

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


Docker Composee:

version: "3.8"

services:

  react-app:
  
    build: .
    
    ports:
    
      - "9090:80"
      
    volumes:
    
      - ./src:/app/src
      
      - /app/node_modules
      
    environment:
    
      - NODE_ENV=production
      
    restart: always


RUN DOCKER COMPOSE:
    docker compose up -d

This setup ensures a smooth user experience while keeping the system secure and efficient. Let me know if you need more details! 



