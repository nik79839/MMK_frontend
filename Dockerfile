FROM node:15.13-alpine
WORKDIR /app
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]