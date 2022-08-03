FROM node:lts-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY aws-task-definition.json ./task-definition.json
COPY src ./src
RUN ls -a
RUN npm install -g npm@8.15.1
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:lts-alpine
WORKDIR /usr
COPY package.json ./
COPY prisma ./
COPY aws-task-definition.json ./task-definition.json
COPY .env ./
RUN npm install --only=production
COPY --from=0 /usr/build .
RUN npm install pm2 -g
EXPOSE 5000
CMD ["pm2-runtime","index.js"]