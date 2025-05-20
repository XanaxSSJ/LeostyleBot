FROM oven/bun:1.2.13

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 8000
CMD ["bun", "index.js"]