# Build stage
FROM --platform=linux/amd64 node:lts-alpine as Builder

WORKDIR /app

# Copy package files and TypeScript configuration
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Create logs directory with proper permissions
RUN mkdir -p logs && chown -R node:node logs

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Switch to non-root user
USER node

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"] 