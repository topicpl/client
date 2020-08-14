FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
RUN ls && cat index.js
CMD [ "node", "index.js" ]
