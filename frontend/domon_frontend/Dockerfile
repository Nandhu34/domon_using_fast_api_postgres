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

FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Add build args and env
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_FRONTEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_FRONTEND_URL=$REACT_APP_FRONTEND_URL

RUN npm run build

RUN npm install -g serve
EXPOSE 3000

CMD sh -c "serve -s build -l ${PORT:-3000}"
