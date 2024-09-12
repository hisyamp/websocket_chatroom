# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application code into the container
COPY . .

# Expose port 4000 for the WebSocket server
EXPOSE 4000

# Define the command to start the application
CMD ["node", "server.js"]
