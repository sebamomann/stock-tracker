FROM node:7.4.0

ADD . /src
RUN cd /src && npm install && npm run build && npm prune --production

CMD ["npm", "run-script", "serve"]
