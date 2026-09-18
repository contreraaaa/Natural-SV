# Guía corta para la defensa

## Explicación inicial

NaturalSV resuelve el desorden causado por manejar clientes, pedidos e inventario desde conversaciones separadas. La web centraliza esos procesos y diferencia las funciones de administrador y cliente.

## Demostración recomendada

1. Mostrar el login y explicar las validaciones.
2. Entrar como administrador.
3. Enseñar el dashboard y explicar que las métricas se calculan desde los pedidos.
4. Crear o editar un producto para demostrar el CRUD y la actualización dinámica.
5. Cambiar el estado de un pedido.
6. Cerrar sesión y entrar como cliente.
7. Agregar productos al carrito y confirmar la compra.
8. Mostrar el nuevo pedido y explicar que el inventario se descuenta automáticamente.

## Arquitectura en palabras sencillas

- UI: lo que el usuario ve y utiliza.
- Lógica: reglas como validar stock, calcular totales y controlar estados.
- Datos: usuarios, productos y pedidos obtenidos desde una API REST mock.
- Context API: comparte sesión, carrito y datos actualizados entre las pantallas.

## Preguntas que pueden hacer

### ¿Por qué se usó Context API?

Porque este avance maneja un estado global moderado: sesión, productos, pedidos y carrito. Context evita pasar datos manualmente entre muchos componentes y cumple la separación de capas.

### ¿Dónde está la API REST?

En los Route Handlers dentro de src/app/api. La aplicación consume el endpoint de inicialización y queda preparada para sustituir el mock por Firebase o un backend propio.

### ¿Cómo funcionan los roles?

Al iniciar sesión se identifica si el usuario es administrador o cliente. Cada rol recibe rutas y permisos distintos: el administrador gestiona el negocio; el cliente compra y consulta sus pedidos.

### ¿Cuál es la lógica de negocio principal?

Antes de crear un pedido se valida la existencia disponible, se calculan subtotal, envío y total, se genera la orden y se descuenta el inventario. El administrador después controla el ciclo del pedido.

### ¿Los datos son permanentes?

Para esta entrega se usa API mock y persistencia en el navegador, suficiente para demostrar el flujo en Vercel sin exponer claves. En la siguiente etapa el repositorio de datos se reemplaza por Firebase/Firestore.

### ¿Cómo se manejan los errores?

Los formularios validan datos obligatorios, correo, longitud de contraseña, valores numéricos y duplicados. También se bloquean compras sin stock y eliminaciones que romperían historiales.

## Reparto sugerido entre cinco integrantes

1. Autenticación, roles y rutas.
2. Productos e inventario.
3. Pedidos, carrito y lógica de stock.
4. Clientes, usuarios y validaciones.
5. Dashboard, estilos responsive, pruebas y despliegue.

Cada estudiante debe poder explicar su aporte y mostrar al menos un commit propio.
