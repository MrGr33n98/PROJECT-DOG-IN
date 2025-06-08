# Use Node 20 for building the application
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Build frontend assets
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Install only prod dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files and server code
COPY --from=builder /app/dist ./dist
COPY server ./server

# Expose application port
EXPOSE 3000

CMD ["node", "server/server.js"]
