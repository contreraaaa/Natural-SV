# Cumplimiento de la rúbrica - NaturalSV

## Requerimientos técnicos

| Requerimiento | Implementación | Evidencia |
| --- | --- | --- |
| React + Next.js | Next.js App Router con React y TypeScript | src/app |
| Capas UI / lógica / datos | Componentes, Context API y modelos/datos separados | src/components, src/context, src/lib |
| Módulos de Etapa 1 | Usuarios, productos, inventario, clientes, pedidos y reportes | Navegación administrativa y de cliente |
| API REST | Endpoints GET y POST mock | src/app/api |
| Interfaz responsive | Tailwind CSS, menú móvil, tablas adaptables y tarjetas | Todas las vistas |
| Registro, login y rutas protegidas | Sesión persistente, validación y navegación según rol | AuthScreen y NaturalSVApp |
| Dos roles | Administrador y cliente con módulos distintos | adminNav y clientNav |
| Validación y errores | Correos, contraseñas, campos, stock, duplicados y eliminaciones protegidas | AppContext y formularios |
| GitHub por alumno | Instrucciones para ramas, commits y Pull Requests | README |
| Vercel | Proyecto compatible y compilación de producción validada | npm run build |

## Requerimientos funcionales mínimos

1. Autenticación: registro, login, cierre de sesión y control por rol.
2. Gestión principal: CRUD de productos; edición, activación y eliminación controlada de usuarios.
3. Lógica central: carrito, totales, envío gratis desde $45, validación y descuento de stock, ciclo de pedidos.
4. Dashboard: ventas entregadas, pedidos activos, clientes, alertas y ranking de productos.
5. Actualización dinámica: todos los cambios aparecen inmediatamente y persisten en el navegador.

## Pruebas para la entrega

- Iniciar como administrador y editar el stock de un producto.
- Crear un producto y verificar que aparezca en el catálogo del cliente.
- Cambiar el estado de un pedido.
- Consultar el historial de un cliente.
- Iniciar como cliente, agregar productos al carrito y confirmar un pedido.
- Comprobar que el pedido aparezca en Mis pedidos y que el inventario disminuya.
- Probar una contraseña incorrecta, un formulario vacío y una compra sin stock.
- Revisar el proyecto en celular y computadora.

## Pendientes que requieren cuentas del grupo

- Crear el repositorio de GitHub.
- Agregar a los cinco integrantes como colaboradores.
- Confirmar que cada integrante tenga rama y commits reales.
- Importar el repositorio en Vercel.
- Probar el enlace público y pegarlo en la entrega.
