FROM node:18-alpine AS builded
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builded /app /app/
EXPOSE 5000
RUN command
CMD [ "node" , "dist/main.js" ]