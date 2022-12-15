# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 

# Set the working directory to /app inside the container
WORKDIR /usr/src/app

# Copy app files
COPY . .
COPY entrypoint.sh /bin/entrypoint.sh

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
# RUN npm ci 
RUN npm install
RUN apt-get update -y
RUN apt-get install -y lsof

RUN chmod g=u /etc/passwd \
  && chmod -R g=u /usr/src/app \
  && chgrp -R 0 /usr/src/app \
  && chmod +x /bin/entrypoint.sh

# Build the app
RUN npm run build

# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 5011

# Start the app
# CMD [ "npx", "serve", "build" ]
ENTRYPOINT [ "/bin/entrypoint.sh" ]
CMD [ "npm", "start" ]
USER 105011