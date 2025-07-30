# Stage 1: Build (Install dependencies)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Copy source
COPY . .

# Stage 2: Runtime (Smaller image)
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app /app

# Set environment variables dynamically via docker-compose
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV MONGO_HOST=$MONGO_HOST
ENV MONGO_PORT=$MONGO_PORT
ENV MONGO_DB=$MONGO_DB

EXPOSE 5000

CMD ["node", "index.js"]
