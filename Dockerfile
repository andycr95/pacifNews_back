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
RUN npx prisma generate
RUN mkdir ./uploads
RUN echo "DATABASE_URL=mysql://pacificnews_usr_ex:ESz4gu3abBEiEXue@192.241.155.75:3306/pacificNews?schema=public ACCESS_TOKEN_SECRET=unipacifico" >> ./.env
RUN npm install pm2 -g
RUN ls -a
EXPOSE 5000
CMD ["pm2-runtime","index.js"]