# Сборка бэкенда
FROM node:20 AS builder
WORKDIR /app/
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Прокси для запуска приложения
FROM node:20 as production
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000

COPY --from=builder /app/public ./public  

CMD [ "sh", "-c", "node ./dist/main.js" ]