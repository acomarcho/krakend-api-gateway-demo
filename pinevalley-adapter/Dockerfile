FROM node:18.6.0-alpine3.15
RUN addgroup app && adduser -S -G app app
USER app
WORKDIR /app
COPY --chown=app:node package*.json .
RUN npm install
COPY --chown=app:node . .
EXPOSE 8080
# Shell form
# /bin/sh
# This command will spin a new shell and execute the command there
# CMD npm start

# Exec form
CMD ["npm", "start"]