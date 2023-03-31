FROM node:latest
WORKDIR /app
COPY . .
RUN rm -rf /node_modules
RUN rm -rf /.next
RUN npm install
RUN npm run build
CMD ["npm", "start", "-p", "80"]