FROM nodejs:latest
RUN npm install
RUN npm run build
CMD ["npm", "start", "-p", "80"]