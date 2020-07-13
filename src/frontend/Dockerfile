# pull official base image
FROM node:13.12.0-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./src/frontend /app
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent


# start app
CMD ["npm", "start"]