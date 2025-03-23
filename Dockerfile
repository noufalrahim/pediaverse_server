FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN cd src && npx drizzle-kit push

EXPOSE 8000

CMD ["npm", "run", "dev"]
