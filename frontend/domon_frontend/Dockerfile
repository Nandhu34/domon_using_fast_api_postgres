# # Use an official Node.js runtime as a parent image
# FROM node:20-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json first (better caching)
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install --legacy-peer-deps



# RUN rm -rf node_modules package-lock.json && npm cache clean --force
# RUN npm install --legacy-peer-deps

# RUN npm install @babel/plugin-proposal-private-property-in-object --save-dev


# # Copy the entire project (after installing dependencies for caching efficiency)
# COPY . .

# # Build the React application
# RUN npm run build  # ✅ Build the React app

# # Install a lightweight web server for serving static files
# RUN npm install -g serve

# # Expose the port Railway will use
# EXPOSE 3000

# # Serve the built React application
# CMD ["npx", "serve", "-s", "build", "-l", "3000"]


# Use an official Node.js runtime as a base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files for layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the project
COPY . .

# Build the React application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Serve the build directory
CMD ["serve", "-s", "build", "-l", "3000"]
