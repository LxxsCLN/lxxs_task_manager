# Etapa de construcción
FROM node:18 AS builder

WORKDIR /app

# Copiar archivos de configuración y dependencias
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY .env ./ 

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY public ./public
COPY src ./src
COPY index.html ./

# Compilar el proyecto
RUN npm run build

# Etapa de producción con nginx
FROM nginx:stable-alpine

# Copiar los archivos estáticos generados por Vite
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
