# Usa la imagen oficial de Nginx
FROM nginx:alpine

# Copia el archivo de configuración personalizado de Nginx (opcional, ver paso 2)
COPY nginx.conf /etc/nginx/nginx.conf

# Copia todos los archivos del proyecto a la carpeta de archivos estáticos de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80 (por defecto en Nginx)
EXPOSE 80

# Comando de inicio de Nginx en el contenedor
CMD ["nginx", "-g", "daemon off;"]
