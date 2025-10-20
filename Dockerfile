# Use the latest LTS Node.js image (not Alpine)
FROM node:18

# Create working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy all app files
COPY . .

# Expose Render’s dynamic port
EXPOSE 10000

# Start your bot
CMD ["node", "bot.js"]
