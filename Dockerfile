# 1️⃣ Usa una imagen ligera de Node.js con Alpine Linux
FROM node:18-alpine 

# 2️⃣ Establece el directorio de trabajo
WORKDIR /app 

# 3️⃣ Copia solo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# 4️⃣ Instala dependencias de producción
RUN npm install --only=production 

# 5️⃣ Copia el resto del código fuente
COPY . .

# 6️⃣ Construye la aplicación (TypeScript a JavaScript)
RUN npm run build 

# 7️⃣ Expone el puerto 3000 (cámbialo si usas otro)
EXPOSE 3000 

# 8️⃣ Comando para iniciar la aplicación en Railway
CMD ["npm", "start"]
