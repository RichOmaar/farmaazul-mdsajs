# ../strapi-v4/Dockerfile
FROM node:20-alpine
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
WORKDIR /opt/app

# IMPORTANT: copy ONLY package.json (NOT package*.json)
COPY package.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npm run build

EXPOSE 1337
CMD ["npm","run","develop"]
