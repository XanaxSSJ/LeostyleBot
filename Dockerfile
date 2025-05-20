# Usa una imagen base con Node.js
FROM node:22-slim

# Crea el directorio de trabajo
WORKDIR /app

# Instala Bun
RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun /bun && \
    ln -s /bun /root/.bun

# Agrega Bun al PATH
ENV PATH="/bun/bin:$PATH"

# Copia los archivos del proyecto
COPY . .

# Instala dependencias
RUN bun install

# Expone el puerto (opcional, solo si usas HTTP/Webhooks)
EXPOSE 8000

# Comando para ejecutar tu bot
CMD ["bun", "index.js"]
