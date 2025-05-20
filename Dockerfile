FROM oven/bun:1.0.27

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .

EXPOSE 8000
CMD ["bun", "index.js"]