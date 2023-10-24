# Stage 1: Build the application
FROM node:alpine as development
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/notifications apps/notifications
COPY libs libs

RUN npx pnpm install -r
RUN npx pnpm run build notifications


# Stage 2: Create the production image
FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy only necessary files for production
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npx pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/notifications/main"]