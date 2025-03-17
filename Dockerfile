FROM node:20

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

# Run the application through ProxyChains
CMD ["npm", "run", "dev"]
