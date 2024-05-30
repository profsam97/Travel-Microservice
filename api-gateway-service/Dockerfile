# development stage
FROM node:18-alpine AS development

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:18 

WORKDIR /usr/src/app
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "./dist/main.js"]


