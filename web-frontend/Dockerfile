# Step 1: Build the React app
FROM node:22-slim

WORKDIR /app

# Copy and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the app and build it
COPY . .
# RUN npm start

# Step 2: Serve using Nginx
# FROM nginx:alpine

# ✅ This now refers to the named build stage
# COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 8081

# CMD ["nginx", "-g", "daemon off;"]
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start"]
