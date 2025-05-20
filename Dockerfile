# Usa una imagen base con Node.js y curl (para instalar Bun)
FROM node:22-slim

# Crea el directorio de la app
WORKDIR /app

# Instala Bun
RUN curl -fsSL https://bun.sh/install | bash

# Agrega Bun al PATH
ENV PATH="/root/.bun/bin:$PATH"

# Copia los archivos del proyecto
COPY . .

# Instala dependencias
RUN bun install

# Expone el puerto (opcional, si tu bot usa webhooks u otra interfaz HTTP)
EXPOSE 8000

# Comando para ejecutar tu bot
CMD ["bun", "index.js"]
