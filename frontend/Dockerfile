# Stage 1: Build React app
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Accept API URL as build-time argument
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build React for production with env injected
RUN npm run build

# Stage 2: Nginx for serving static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Custom Nginx config for SPA
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
