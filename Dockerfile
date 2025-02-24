FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
COPY src ./src

RUN --mount=type=cache,target=/root/.npm npm ci
RUN npm run build

FROM node:22-alpine

WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set environment variables (these will be overridden at runtime)
ENV KIBELA_TEAM=your-team
ENV KIBELA_TOKEN=your-token

EXPOSE 3000

# Command to run the executable
ENTRYPOINT ["node", "dist/index.js"] 
