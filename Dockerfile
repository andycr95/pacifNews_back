FROM node:lts-alpine
WORKDIR /usr/app
COPY . .
RUN ls -a
RUN apt-get update \
 && apt-get install -y unzip wget libaio1 \
 && mkdir -p opt/oracle \
# ADD ORACLE INSTANT CLIENT from local system
 && unzip instantclient-basic-linux.x64-19.3.0.0.0dbru.zip -d /opt/oracle \
 && mv /opt/oracle/instantclient_19_3 /opt/oracle/instantclient

# Setup the path to find the instantclient with node-oracledb library
ENV LD_LIBRARY_PATH="/opt/oracle/instantclient"

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
RUN echo "ACCESS_TOKEN_SECRET=unipacifico" >> ./.env
RUN npm install pm2 -g
RUN ls -a
EXPOSE 5000
CMD ["pm2-runtime","index.js"]