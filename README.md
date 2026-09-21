Integrantes:

Luis Alexander Arteaga Sigüenza Carnet: AS230282

Emerson Alexander Gudiel Magaña Carnet: GM171814

Héctor Enrique Hernández Cerón  Carnet: HC120286

José Armando Contreras Rosales  Carnet: CR252999

José Daniel Rodas Cerin 	    Carnet: RC230465

# NaturalSV - Primer avance web

Sistema web responsive para centralizar productos, inventario, clientes, usuarios y pedidos del emprendimiento NaturalSV. Fue desarrollado con React, Next.js, TypeScript y Tailwind CSS.

## Funciones implementadas

- Registro e inicio de sesión con validaciones.
- Rutas y navegación diferenciadas para administrador y cliente.
- CRUD de productos con control de precio, stock, alerta mínima y estado.
- Gestión de usuarios: edición, roles, activación y eliminación controlada.
- Gestión de clientes con historial de compras.
- Catálogo, carrito, cálculo automático, validación de existencias y creación de pedidos.
- Descuento automático de inventario al confirmar una compra.
- Seguimiento de pedidos y transición de estados.
- Dashboard con métricas, ventas, productos más vendidos y alertas de stock.
- API REST mock mediante Route Handlers de Next.js.
- Persistencia de la demostración en localStorage.
- Diseño adaptable para computadora, tableta y celular.

## Cuentas de demostración

| Rol | Correo | Contraseña |
| --- | --- | --- |
| Administrador | admin@naturalsv.com | Admin123! |
| Cliente | cliente@naturalsv.com | Cliente123! |

En el login también aparecen botones para completar estos accesos automáticamente.

## Ejecutar el proyecto

Requiere Node.js 20 o superior.

    npm install
    npm run dev

Abrir http://localhost:3000.

Validación antes de entregar:

    npm run lint
    npm run build

## Arquitectura por capas

- UI: src/app y src/components
- Lógica de negocio: src/context/AppContext.tsx
- Datos y modelos: src/lib
- API REST: src/app/api

El mock mantiene el avance totalmente demostrable en Vercel sin claves privadas. La siguiente etapa puede reemplazar la persistencia local por Firebase/Firestore conservando las pantallas y la lógica.

## Flujo de Git requerido por la rúbrica

Cada integrante debe ser colaborador del repositorio y trabajar en su propia rama:

    git checkout -b feature/nombre-integrante
    git add .
    git commit -m "feat: aporte realizado por nombre"
    git push -u origin feature/nombre-integrante

Después se crea un Pull Request hacia main. No conviene inventar commits: cada integrante debe hacer y explicar al menos un cambio real.

## Despliegue en Vercel

1. Subir el proyecto a GitHub.
2. En Vercel, seleccionar Add New > Project.
3. Importar el repositorio.
4. Mantener Framework Preset: Next.js.
5. Pulsar Deploy.
6. Probar ambos roles y guardar el enlace público para Aula Digital.

No se necesitan variables de entorno para esta versión mock.

## Documentos de apoyo

- docs/CUMPLIMIENTO-RUBRICA.md
- docs/GUIA-DEFENSA.md
