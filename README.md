# Signal Watcher - Backend

Este es el servicio de backend para la aplicación Signal Watcher. Es una API RESTful construida con Node.js, Express y TypeScript, diseñada para gestionar listas de observación (watchlists), simular eventos de seguridad y realizar análisis de IA sobre ellos.

## Características

- **API RESTful:** Endpoints claros y consistentes para gestionar recursos.
- **Gestión de Watchlists:** Operaciones CRUD completas para listas de observación y sus términos.
- **Simulación de Eventos:** Endpoint para crear eventos de seguridad simulados.
- **Análisis de IA (Simulado):** Lógica interna para analizar eventos y asignarles una severidad, resumen y acciones sugeridas.
- **Base de Datos con Prisma:** ORM moderno para una interacción segura y tipada con la base de datos PostgreSQL.

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL** (Base de Datos)
- **ts-node-dev** para recarga en caliente en desarrollo.
- **CORS** para permitir peticiones desde el frontend.

---

## Pasos para la Instalación y Ejecución

Sigue estos pasos para levantar el entorno de desarrollo local.

### 1. Prerrequisitos

- **Node.js** (v18 o superior)
- **npm** o un gestor de paquetes compatible.
- **PostgreSQL** instalado y corriendo en tu máquina.

### 2. Clonar y Configurar el Proyecto

```bash
# Navega al directorio del backend
cd signal-watcher-backend

# Instala las dependencias
npm install
```

### 3. Configurar la Base de Datos

1.  Crea una base de datos en PostgreSQL. Por ejemplo, `signal_watcher_db`.
2.  Crea un archivo `.env` en la raíz del directorio del backend, copiando el contenido de `.env.example` (si existe) o usando la siguiente plantilla:

    ```env
    # URL de conexión a tu base de datos PostgreSQL
    # Formato: postgresql://[USUARIO]:[CONTRASEÑA]@[HOST]:[PUERTO]/[NOMBRE_DB]
    DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/signal_watcher_db"

    # Puerto en el que correrá el servidor
    PORT=3001
    ```

    **Importante:** Asegúrate de que la `DATABASE_URL` coincida con la configuración de tu base de datos local.

### 4. Aplicar las Migraciones de la Base de Datos

Con el archivo `.env` configurado, ejecuta el siguiente comando para que Prisma cree las tablas en tu base de datos:

```bash
npx prisma migrate dev
```

### 5. Ejecutar el Servidor de Desarrollo

Una vez completados los pasos anteriores, puedes iniciar el servidor:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3001`.

---

## Documentación de la API

La API base se encuentra en `/api/v1`.

### Watchlists (`/watchlists`)

-   `GET /`: Obtiene todas las listas de observación.
-   `POST /`: Crea una nueva lista de observación.
    -   **Body (JSON):** `{ "name": string, "description": string, "terms": [{ "term": string, "type": string }] }`
-   `DELETE /:id`: Elimina una lista de observación por su ID.

### Security Events (`/events`)

-   `GET /`: Obtiene todos los eventos de seguridad.
-   `POST /simulate`: Simula un nuevo evento y lo analiza.
    -   **Body (JSON):** `{ "title": string, "description": string, "source": string, "watchlistId": string }`
