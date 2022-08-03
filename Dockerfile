FROM node:lts-alpine
WORKDIR /usr/app
COPY . .
RUN ls -a
RUN npm install -g npm@8.15.1
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:lts-alpine
WORKDIR /usr/app
COPY package.json ./
RUN ls -a
RUN npm install --only=production
COPY --from=0 /usr/app/build .
COPY --from=0 /usr/app/prisma ./prisma
COPY .env ./.env
RUN npx prisma generate
RUN npm install pm2 -g
RUN ls -a
EXPOSE 5000
CMD ["pm2-runtime","index.js"]