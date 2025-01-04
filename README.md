📌 Descripción del Repositorio

NOC-Monitor es una aplicación diseñada para supervisar el estado de servicios web mediante la verificación de URLs. Si un servicio no responde correctamente, el sistema genera logs, envía alertas por correo y almacena los eventos en una base de datos con múltiples fuentes de datos (datasources).

🏗️ Arquitectura y Diseño:

Basado en Clean Architecture, asegurando modularidad y facilidad de mantenimiento.
Implementa el Repository Pattern y Adapter Pattern para una mejor separación de responsabilidades y abstracción de acceso a datos.

📡 Características principales:

🔍 Monitoreo de URLs para detectar fallos en los servicios.
📝 Registro de eventos y errores en logs.
📩 Notificaciones por correo cuando un servicio está inactivo.
💾 Almacenamiento de eventos en una base de datos con múltiples datasources.
📊 Panel de control para visualizar el historial de incidentes (si aplica).
🚀 Ideal para equipos de NOC y administradores que requieren un sistema automatizado de monitoreo y alertas.

🔧 Configuración:

1. Clonar el repositorio desde GitHub: https://github.com/MaiGdev/NOC-Monitor.git
2. Instalar las dependencias: En la carpeta del proyecto, ejecutar `npm install` o `yarn install`.
3. Configurar las credenciales de la base de datos: Crear un archivo `.env` en la raíz del proyecto y agregar las siguientes variables de entorno:
   - PORT: 3000
   - MAILER_EMAIL:
   - MAILER_SECRET:
