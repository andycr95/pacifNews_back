FROM node:lts-alpine
WORKDIR /usr/app
COPY . .
RUN ls -a
RUN npm install -g npm@8.19.2
RUN npm install
RUN npm run build
RUN yum update -y && \
  yum install -y oracle-release-el7 && \
  yum install -y oracle-nodejs-release-el7 && \
  yum install -y --disablerepo=ol7_developer_EPEL nodejs && \
  yum install -y oracle-instantclient19.3-basic.x86_64 &&

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
RUN echo "ACCESS_TOKEN_SECRET=unipacifico" >> ./.env
RUN npm install pm2 -g
RUN ls -a
EXPOSE 5000
CMD ["pm2-runtime","index.js"]