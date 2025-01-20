FROM node:18 AS base
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g pnpm && pnpm add typescript
RUN pnpm install 

COPY . .
RUN pnpx prisma generate
RUN pnpm build

FROM node:18 AS production
WORKDIR /usr/src/app

COPY --from=base /usr/src/app/dist ./
EXPOSE 3000

CMD ["node", "index.js"]

