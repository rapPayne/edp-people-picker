FROM node:alpine
WORKDIR /app
COPY ./ ./
RUN npm install
EXPOSE 3500
CMD ["node", "main.js"]