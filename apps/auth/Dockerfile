# Stage 1: Build the application
FROM node:alpine as development
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/auth apps/auth
COPY libs libs

RUN npm install
RUN npm run build auth

# Stage 2: Create the production image
FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

WORKDIR /usr/src/app

# Copy only necessary files for production
COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]