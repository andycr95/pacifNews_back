FROM node:lts-alpine
WORKDIR /usr/app
COPY . .
RUN ls -a
RUN npm install -g npm@8.19.2
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
COPY --from=0 /usr/app/task-definition.json ./task-definition.json
COPY --from=0 /usr/app/firebase.json ./firebase.json
RUN npx prisma migrate dev
RUN npx prisma generate
RUN mkdir ./uploads
RUN echo "DATABASE_URL=mysql://b1cc1b41f50a34:f5dd732c@us-cdbr-east-06.cleardb.net/heroku_774c7aaa1f29565?reconnect=true ACCESS_TOKEN_SECRET=unipacifico" >> ./.env
RUN npm install pm2 -g
RUN ls -a
EXPOSE 5000
CMD ["pm2-runtime","index.js"]