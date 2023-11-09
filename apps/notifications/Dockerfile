# Stage 1: Build the application
FROM node:alpine as development
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./
COPY nest-cli.json ./

COPY apps/notifications apps/notifications
COPY libs/common libs/common
RUN npm install pnpm -g
RUN pnpm install --recursive
RUN pnpm build notifications

# Stage 2: Create the production image
FROM node:alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy only necessary files for production
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY libs/common libs/common

RUN npm install pnpm -g
RUN pnpm install --prod

COPY --from=development /usr/src/app/apps/notifications/node_modules ./apps/notifications/node_modules
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/notifications/main"]