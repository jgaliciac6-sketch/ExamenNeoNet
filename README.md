# ExamenNeoNet

Proyecto compuesto por un backend en **.NET (ASP.NET Core Web API)** y un frontend en **Next.js**, con **SQL Server** como base de datos.

## Requisitos previos

- [Visual Studio](https://visualstudio.microsoft.com/) (con la carga de trabajo ASP.NET y desarrollo web)
- [Node.js](https://nodejs.org/) (v18 o superior) y npm
- SQL Server (local o instancia accesible) y SQL Server Management Studio (SSMS) u otra herramienta para ejecutar scripts `.sql`

## 1. Base de datos

1. Abre SQL Server Management Studio (o la herramienta de tu preferencia) y conéctate a tu instancia de SQL Server.
2. Ejecuta el script [`dataBaseBackup.sql`](./dataBaseBackup.sql) ubicado en la raíz del proyecto. Este script crea la base de datos `ExamenNeoNet` junto con sus tablas.
3. Verifica que la base de datos `ExamenNeoNet` se haya creado correctamente.

## 2. Backend (ASP.NET Core)

1. Abre la solución `backend/ExamenNeonetApi/ExamenNeonetApi.sln` en Visual Studio.
2. Revisa el archivo `backend/ExamenNeonetApi/ExamenNeonetApi/appsettings.json` y ajusta la cadena de conexión `ConnectionStrings:CadenaSQL` con los datos de tu instancia de SQL Server (servidor, usuario y contraseña):

   ```json
   "ConnectionStrings": {
     "CadenaSQL": "Data Source=TU_SERVIDOR;Initial Catalog=ExamenNeoNet;User ID=TU_USUARIO;Password=TU_PASSWORD;TrustServerCertificate=True;"
   }
   ```

3. Ejecuta el proyecto con **F5** (o el botón "Run") desde Visual Studio.
4. La API quedará disponible en `http://localhost:4000`.

## 3. Frontend (Next.js)

1. Abre una terminal en la carpeta `frontend`.
2. Instala las dependencias:

   ```bash
   npm i
   ```

3. Copia el archivo `.env.example` como `.env` (si no existe ya) y verifica que las variables apunten al backend:

   ```
   NEXT_PUBLIC_URL_API=http://localhost:4000/api
   NEXT_PUBLIC_TOKEN_COOKIE=nexus_games_token
   ```

4. Levanta el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre `http://localhost:3000` en el navegador.

## Validación de stock

El stored procedure encargado de descontar la cantidad vendida valida el stock disponible antes de actualizarlo:

- Si `PROStock >= @Cantidad`, se descuenta la cantidad y `@SUCCESS = 1`.
- Si el stock es insuficiente, no se actualiza el producto, `@SUCCESS = 0` y `@MESSAGE = 'La cantidad de artículos es mayor al stock'`.

Esta validación se realiza a nivel de base de datos (script `dataBaseBackup.sql`), por lo que cualquier venta que intente descontar más unidades de las disponibles será rechazada por el backend antes de completarse.

## Orden recomendado para correr el proyecto

1. Ejecutar el script `dataBaseBackup.sql` para generar la base de datos.
2. Correr el backend desde Visual Studio.
3. Correr el frontend con `npm i` y `npm run dev`.
