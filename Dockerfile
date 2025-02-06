# Use the official Node.js image as the base image
FROM node:alpine

ENV NODE_ENV=development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

# Command to run the application
CMD ["node","app.js"]
