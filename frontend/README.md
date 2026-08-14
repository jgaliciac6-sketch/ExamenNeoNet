# Game Hub Admin

Crea el frontend completo de un sistema administrativo moderno para una tienda de videojuegos.

## Tecnologías

Usar:

* Next.js con App Router
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons
* Responsive design

IMPORTANTE:

Este proyecto será únicamente el frontend visual / cascarón.

NO implementar:

* API
* Base de datos
* fetch
* Axios
* Server Actions funcionales
* Autenticación real
* Backend

Los datos deben ser mock data local.

Posteriormente los POST, PUT y DELETE serán implementados mediante Next.js Server Actions, por lo que los componentes y formularios deben quedar organizados de forma que sea sencillo conectar esa lógica posteriormente.

---

# Concepto visual

El sistema pertenece a una tienda moderna de videojuegos.

Nombre provisional:

**Nexus Games**

El diseño debe sentirse como un dashboard administrativo profesional, no como una página infantil o excesivamente gamer.

Estilo visual:

* Moderno
* Minimalista
* Premium
* Inspirado ligeramente en interfaces de PlayStation, Steam y dashboards SaaS modernos
* Fondo oscuro
* Tonos gris carbón / slate
* Detalles en violeta, azul eléctrico e índigo
* Tarjetas con bordes sutiles
* Sombras suaves
* Border radius moderno
* Excelente espaciado
* Animaciones hover sutiles
* Tipografía limpia
* Evitar demasiados efectos neon
* Evitar fondos recargados
* Debe parecer un sistema empresarial real

---

# LOGIN

Crear una página `/login`.

Layout dividido en dos secciones.

## Lado izquierdo

Sección visual relacionada con videojuegos.

Puede contener:

* Imagen/ilustración abstracta relacionada con gaming
* Controles
* Consolas
* Luces ambientales
* Setup gaming moderno

Sobre esta sección colocar:

**Nexus Games**

Texto:

"Administración de ventas"

Y una pequeña descripción:

"Gestiona productos, clientes y ventas desde un solo lugar."

Agregar un gradiente oscuro para mantener buena legibilidad.

## Lado derecho

Formulario dentro de una tarjeta elegante.

Título:

**Bienvenido**

Subtítulo:

"Inicia sesión para acceder al sistema"

Campos:

* Usuario
* Contraseña

Checkbox:

* Recordarme

Botón principal:

**Iniciar sesión**

Agregar icono para mostrar/ocultar contraseña.

Por ahora el botón puede simplemente navegar a `/dashboard`.

No implementar autenticación real.

---

# LAYOUT PRINCIPAL

Después del login utilizar un dashboard con:

## Sidebar

Logo:

Nexus Games

Menú:

* Dashboard
* Productos
* Clientes
* Ventas

Iconos Lucide correspondientes.

Parte inferior:

Usuario conectado:

Administrador

Mostrar:

* Avatar
* Nombre
* Rol

Y botón:

Cerrar sesión

El sidebar debe poder contraerse en desktop.

En móvil debe funcionar como drawer.

---

# HEADER

Header superior con:

Título dinámico de la página.

Por ejemplo:

**Ventas**

A la derecha:

* Buscador
* Icono de notificaciones
* Avatar del usuario

---

# DASHBOARD

Ruta:

`/dashboard`

El dashboard debe estar enfocado principalmente en las ventas.

Agregar tarjetas de estadísticas:

* Ventas del día
* Total vendido
* Productos vendidos
* Clientes atendidos

Ejemplo de valores mock:

Ventas del día:
24

Total vendido:
Q 12,450.00

Productos vendidos:
38

Clientes:
19

Agregar indicadores visuales como:

+12.5%

comparado con ayer.

---

## Ventas recientes

Mostrar una tabla grande llamada:

**Ventas recientes**

Columnas:

* # Venta
* Cliente
* Fecha
* Productos
* Total
* Estado
* Acción

Ejemplo:

#000124

Carlos Hernández

13/08/2026

3 productos

Q 1,249.00

Completada

Botón:

Ver detalle

Usar badges para estado:

* Completada
* Pendiente
* Cancelada

---

# PRODUCTOS

Ruta:

`/productos`

Encabezado:

**Productos**

Descripción:

"Administra el catálogo de productos disponibles."

Botón principal:

**Nuevo producto**

Agregar buscador.

Agregar filtro de:

* Disponibilidad
* Stock

Tabla:

* Producto
* Precio
* Stock
* Estado
* Acciones

Los productos deben ser videojuegos.

Mock data:

The Legend of Zelda

Q599.00

12 unidades

Disponible

---

EA Sports FC

Q549.00

4 unidades

Stock bajo

---

Sonic X Shadow Generations

Q499.00

0 unidades

Agotado

---

Resident Evil 4

Q449.00

8 unidades

Disponible

Mostrar una pequeña portada placeholder del videojuego al lado del nombre.

Estados mediante badges.

Acciones mediante menú de tres puntos:

* Ver
* Editar
* Eliminar

No implementar lógica.

---

# NUEVO PRODUCTO

Crear modal o Sheet lateral.

Campos:

Nombre

Precio

Stock

Botones:

Cancelar

Guardar producto

No conectar a ninguna API.

Dejar el formulario preparado para utilizar posteriormente Server Actions.

---

# CLIENTES

Ruta:

`/clientes`

Encabezado:

**Clientes**

Descripción:

"Consulta y administra los clientes registrados."

Botón:

**Nuevo cliente**

Buscador:

"Buscar cliente..."

Tabla:

* ID
* Cliente
* Email
* Compras
* Total gastado
* Acciones

Ejemplos:

Carlos Hernández
[carlos@email.com](mailto:carlos@email.com)
4 compras
Q 3,250.00

María López
[maria@email.com](mailto:maria@email.com)
7 compras
Q 6,780.00

Acciones:

* Ver historial
* Editar
* Eliminar

---

# NUEVO CLIENTE

Modal o Sheet.

Campos:

Nombre

Email

Botones:

Cancelar

Guardar cliente

Agregar validaciones visuales de formulario pero sin lógica de backend.

---

# VENTAS

Ruta:

`/ventas`

Esta debe ser una de las páginas visualmente más importantes.

Encabezado:

**Ventas**

Descripción:

"Consulta y administra las ventas realizadas."

Botón principal:

**Nueva venta**

Agregar filtros:

* Buscar
* Fecha
* Cliente
* Estado

Tabla:

* # Venta
* Cliente
* Fecha
* Productos
* Total
* Estado
* Acción

Ejemplos:

#000124
Carlos Hernández
13 Ago 2026
3 productos
Q1,249.00
Completada

#000123
María López
13 Ago 2026
2 productos
Q899.00
Completada

#000122
José Ramírez
12 Ago 2026
1 producto
Q599.00
Pendiente

Al presionar una venta navegar a:

`/ventas/[id]`

---

# DETALLE DE VENTA

Ruta:

`/ventas/[id]`

Diseñar una página elegante de detalle.

Header:

**Venta #000124**

Badge:

Completada

Mostrar:

Fecha

13 de agosto de 2026, 18:45

---

## Información del cliente

Tarjeta:

Carlos Hernández

[carlos@email.com](mailto:carlos@email.com)

---

## Productos

Tabla:

Producto

Precio

Cantidad

Subtotal

Ejemplo:

Sonic X Shadow Generations

Q499.00

1

Q499.00

---

Resident Evil 4

Q375.00

2

Q750.00

---

Mostrar resumen a la derecha:

Subtotal

Q1,249.00

Total

**Q1,249.00**

El total debe destacar visualmente.

Agregar botón:

Volver a ventas

---

# NUEVA VENTA

Ruta:

`/ventas/nueva`

Crear una interfaz moderna de punto de venta.

Debe dividirse en dos columnas.

## Izquierda

Título:

**Productos**

Buscador:

"Buscar videojuegos..."

Mostrar productos como cards.

Cada card contiene:

* Imagen
* Nombre
* Precio
* Stock
* Botón Agregar

Ejemplo:

Sonic X Shadow Generations

Q499

Stock: 12

Agregar

---

## Derecha

Panel:

**Nueva venta**

Selector de cliente.

Campo:

Buscar o seleccionar cliente.

Luego mostrar:

**Productos seleccionados**

Cada producto debe permitir visualmente:

* Incrementar cantidad
* Disminuir cantidad
* Eliminar

Mostrar:

Subtotal

Total

Botón grande:

**Registrar venta**

No registrar realmente la venta.

El botón debe quedar preparado para conectarse posteriormente mediante Server Action.

---

# COMPONENTES

Crear componentes reutilizables.

Por ejemplo:

components/
layout/
sidebar.tsx
header.tsx

```
dashboard/
    stat-card.tsx
    recent-sales.tsx

products/
    product-table.tsx
    product-form.tsx
    product-card.tsx

customers/
    customer-table.tsx
    customer-form.tsx

sales/
    sales-table.tsx
    sale-detail.tsx
    sale-cart.tsx
```

No es obligatorio seguir exactamente esta estructura si V0 encuentra una organización mejor.

---

# MOCK DATA

Crear mock data TypeScript para:

products

customers

sales

saleDetails

users

No utilizar API.

---

# USUARIO

Preparar visualmente el sistema considerando que posteriormente existirá una tabla Usuario.

Por ahora utilizar:

Usuario:

admin

Nombre:

Administrador

Rol:

Administrador

No implementar autenticación real.

---

# RESPONSIVE

Desktop:

Sidebar fijo + contenido.

Tablet:

Sidebar colapsable.

Mobile:

Sidebar drawer.

Las tablas deben transformarse correctamente o tener scroll horizontal.

La pantalla de nueva venta debe convertirse a una sola columna en móvil.

---

# IMPORTANTE

Quiero que V0 genere todas las páginas y componentes del sistema, no únicamente una pantalla.

Debe quedar como una plantilla frontend completa y navegable.

Utilizar `<Link>` de Next.js para navegar entre las páginas.

No utilizar fetch.

No utilizar APIs externas.

No implementar backend.

No implementar base de datos.

No implementar Server Actions todavía.

No crear endpoints.

No crear Route Handlers.

Todo debe funcionar inicialmente mediante datos mock.

El código debe quedar limpio y organizado para que posteriormente otro desarrollador pueda reemplazar los mocks con consultas reales y utilizar Server Actions para POST, PUT y DELETE.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5ce992c7-3f08-4c7b-818f-3070fe982c97).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
