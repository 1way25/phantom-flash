FROM node:18

WORKDIR /app

# Install deps first (faster Docker caching)
COPY package*.json ./
RUN npm install --production

# Install system Chromium + fonts for Puppeteer
RUN apt-get update && \
apt-get install -y chromium ca-certificates fonts-liberation && \
rm -rf /var/lib/apt/lists/*

# Copy the rest of the app
COPY . .

# Tell Puppeteer where Chromium lives
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 10000

CMD ["node", "bot.js"]
