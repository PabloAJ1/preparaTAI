# -------- BUILD --------
FROM node:24-alpine AS build

WORKDIR /app

COPY . .

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
ENV CI=true

RUN npm install -g pnpm \
    && pnpm install --frozen-lockfile

RUN pnpm run build:back
RUN pnpm run build:front

# eliminar dependencias de desarrollo
RUN pnpm prune --prod


# -------- RUNTIME --------
FROM node:24-alpine

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/frontend/dist ./dist/frontend
COPY --from=build /app/packages/backend/dist ./dist/backend
COPY --from=build /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "/app/dist/backend/packages/backend/src/main.js"]