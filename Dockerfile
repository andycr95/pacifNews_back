FROM oraclelinux:7-slim
WORKDIR /usr/app
COPY . .
RUN ls -a
RUN yum update -y
RUN yum install -y oracle-release-el7
RUN yum install -y oracle-nodejs-release-el7
RUN yum install -y nodejs
RUN yum install -y oracle-instantclient19.3-basic.x86_64
RUN yum clean all 
RUN node --version
RUN npm install -g npm@8.19.2
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM oraclelinux:7-slim    
RUN yum update -y
RUN yum install -y oracle-release-el7
RUN yum install -y oracle-nodejs-release-el7
RUN yum install -y nodejs
RUN yum install -y oracle-instantclient19.3-basic.x86_64
RUN yum clean all 
RUN node --version
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
RUN npm install pm2 -g
RUN ls -a
EXPOSE 5000
CMD ["pm2-runtime","index.js"]