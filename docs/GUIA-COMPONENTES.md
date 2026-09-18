# Guía de componentes de NaturalSV

## ¿Qué es un componente?

Un componente es una función de React que representa una parte de la interfaz.
Puede ser una pantalla completa, un formulario, una tarjeta o un menú.

Ejemplo:

```tsx
function Notice({ text }: { text: string }) {
  return <div role="alert">{text}</div>;
}
```

`Notice` recibe un texto y devuelve el aviso que se muestra en pantalla.

## Componentes actuales

Los componentes se encuentran en `src/components/NaturalSVApp.tsx` y están
separados mediante funciones claramente indentadas.

### Componentes generales

- `Logo`: muestra el logotipo y nombre de NaturalSV.
- `Notice`: muestra mensajes de error o confirmación.
- `Shell`: contiene el menú lateral, encabezado y área principal.
- `Card`: contenedor visual reutilizable.
- `Status`: muestra el estado de un pedido.
- `Empty`: muestra un mensaje cuando una lista está vacía.

### Autenticación

- `AuthScreen`: pantalla de registro e inicio de sesión.

### Administración

- `Dashboard`: resumen de ventas, pedidos, productos y clientes.
- `Products`: listado y CRUD de productos.
- `ProductModal`: formulario para agregar o modificar productos.
- `Orders`: listado y seguimiento de pedidos.
- `OrderDetail`: detalle de un pedido.
- `Customers`: listado e historial de clientes.
- `UsersView`: administración de usuarios.
- `UserModal`: formulario para modificar un usuario.

### Cliente

- `Catalog`: catálogo de productos disponibles.
- `Cart`: carrito y creación de pedidos.
- `Profile`: información del usuario conectado.
- `Orders` con la propiedad `mine`: muestra solamente los pedidos del cliente.

### Componente principal

- `NaturalSVApp`: comprueba la sesión, valida el rol y decide qué pantalla
  debe mostrarse de acuerdo con la ruta.

## Flujo simplificado

1. `NaturalSVApp` consulta el estado mediante `useApp()`.
2. Si no existe sesión, muestra `AuthScreen`.
3. Si existe sesión, revisa si el usuario es administrador o cliente.
4. Selecciona el componente correspondiente a la ruta.
5. `Shell` coloca ese componente dentro del menú y encabezado general.

## Cómo ordenar el código automáticamente

En Visual Studio Code:

1. Instalar la extensión **Prettier - Code formatter**.
2. Abrir el archivo que se desea ordenar.
3. Presionar `Shift + Alt + F`.
4. Si VS Code pregunta por un formateador, elegir **Prettier**.

Esto cambia la presentación del código, pero no su funcionamiento.

## Organización recomendada para la siguiente etapa

Cuando el grupo empiece a desarrollar cada módulo, se recomienda mover los
componentes a esta estructura:

```text
src/components/
├── layout/
│   ├── Logo.tsx
│   └── Shell.tsx
├── ui/
│   ├── Card.tsx
│   ├── Empty.tsx
│   ├── Notice.tsx
│   └── Status.tsx
└── screens/
    ├── admin/
    │   ├── Dashboard.tsx
    │   ├── Products.tsx
    │   ├── Orders.tsx
    │   ├── Customers.tsx
    │   └── UsersView.tsx
    ├── client/
    │   ├── Catalog.tsx
    │   ├── Cart.tsx
    │   └── Profile.tsx
    └── auth/
        └── AuthScreen.tsx
```

Primero se formateó el archivo actual para evitar cambios grandes de una sola
vez. Después, cada integrante puede extraer su pantalla a un archivo propio en
su rama sin afectar el trabajo de los demás.
