# ============================================================
# AutoMax / FydelMT - Imagen de la aplicación (Node.js + frontend)
# Build: docker build -t automax-web .
# ============================================================

# ---- Etapa 1: dependencias de producción ----
FROM node:20-alpine AS dependencias
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ---- Etapa 2: imagen final (liviana) ----
FROM node:20-alpine AS final
ENV NODE_ENV=production \
    PORT=3000
WORKDIR /app

# Código del servidor y dependencias ya instaladas
COPY --from=dependencias /app/server/node_modules ./server/node_modules
COPY server/package.json ./server/package.json
COPY server/src ./server/src

# Frontend estático
COPY html ./html
COPY css ./css
COPY JS ./JS
COPY img ./img

# Ejecutar sin privilegios de root
RUN chown -R node:node /app
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server/src/app.js"]
