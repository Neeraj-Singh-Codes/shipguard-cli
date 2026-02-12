# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# ---- Production Stage ----
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app /app
USER appuser
EXPOSE 3000
CMD ["node", "index.js"]
