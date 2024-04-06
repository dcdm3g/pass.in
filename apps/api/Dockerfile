FROM node:20 AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app
COPY pnpm-lock.yaml .
COPY apps/api/package.json .
RUN pnpm --filter api i

FROM base AS build

WORKDIR /usr/src/app
COPY apps/api .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

FROM node:20-alpine3.19 AS deploy

WORKDIR /usr/src/app
RUN npm i -g pnpm prisma
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json .
COPY --from=build /usr/src/app/prisma ./prisma
RUN pnpm prisma generate
EXPOSE 3333
CMD [ "pnpm", "start" ]
