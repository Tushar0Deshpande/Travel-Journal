FROM node:20-alpine

WORKDIR /app

# Copy dependency specifications first to leverage Docker layer caching
COPY package*.json ./

RUN npm ci --only=production

# Copy application source code
COPY . .

# Create directory for image uploads
RUN mkdir -p images

EXPOSE 5000

ENV PORT=5000

CMD ["npm", "start"]
