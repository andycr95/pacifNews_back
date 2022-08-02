FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
RUN npm run build
COPY ["./build/*", "./build/.[!.]*"] /app
EXPOSE 3000
RUN chown -R node /app
USER node
CMD ["npm", "start"]
