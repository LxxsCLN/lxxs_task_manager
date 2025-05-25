FROM node:18

WORKDIR /app

COPY package*.json index.js db.js ./
COPY src ./src

RUN npm install
EXPOSE 5000
CMD ["npm", "run", "start"]
