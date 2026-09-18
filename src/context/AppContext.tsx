"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { seedOrders, seedProducts, seedUsers } from "@/lib/seed";
import type { CartItem, Order, OrderStatus, Product, User } from "@/lib/types";

type ProductInput = Omit<Product, "id"> & { imageUrl?: string };
type Registration = Pick<User, "name" | "email" | "password" | "phone">;
interface AppContextValue {
  ready: boolean;
  currentUser: User | null;
  users: User[];
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  login: (email: string, password: string) => string | null;
  register: (data: Registration) => string | null;
  logout: () => void;
  saveProduct: (data: ProductInput, id?: string) => void;
  deleteProduct: (id: string) => string | null;
  saveUser: (data: Omit<User, "id">, id?: string) => string | null;
  deleteUser: (id: string) => string | null;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  addToCart: (product: Product) => string | null;
  changeCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  createOrder: (address: string) => string | null;
  resetDemo: () => void;
}
const AppContext = createContext<AppContextValue | null>(null);
const KEYS = {
  users: "nsv_users",
  products: "nsv_products",
  orders: "nsv_orders",
  session: "nsv_session",
};
function cartKey(userId: string) {
  return `nsv_cart_${userId}`;
}                       //esto hace que cada user tenga su propio carrito, que segun analisis era un carrito por navegacion general.
function load<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    let active = true;
    (async () => {
      let initialUsers: User[];
      let initialProducts: Product[];
      let initialOrders: Order[];
      const hasLocal = localStorage.getItem(KEYS.users) !== null;
      try {
        const response = await fetch("/api/bootstrap");
        if (!response.ok) throw new Error("API no disponible");
        const api = await response.json();
        initialUsers = hasLocal ? load(KEYS.users, api.users) : api.users;
        initialProducts = localStorage.getItem(KEYS.products)
          ? load(KEYS.products, api.products)
          : api.products;
        initialOrders = localStorage.getItem(KEYS.orders)
          ? load(KEYS.orders, api.orders)
          : api.orders;
      } catch {
        initialUsers = load(KEYS.users, seedUsers);
        initialProducts = load(KEYS.products, seedProducts);
        initialOrders = load(KEYS.orders, seedOrders);
      }
      if (!active) return;
      setUsers(initialUsers);
      setProducts(initialProducts);
      setOrders(initialOrders);
      //setCart(load(KEYS.cart, []));
      //const sessionId = load<string | null>(KEYS.session, null);
      //setCurrentUser(initialUsers.find((u) => u.id === sessionId) ?? null);
      //este bloque retoma la sesion del usuario y setea el carrito, para cada uno dependiendo del user
      const sessionId = load<string | null>(
  KEYS.session,
  null
);

const sessionUser =
  initialUsers.find(
    (u) => u.id === sessionId && u.active
  ) ?? null;

setCurrentUser(sessionUser);

if (sessionUser) {
  setCart(
    load<CartItem[]>(
      cartKey(sessionUser.id),
      []
    )
  );
} else {
  setCart([]);
}
// fin bloque modificado
      setReady(true);
    })();
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEYS.users, JSON.stringify(users));
  }, [ready, users]);
  useEffect(() => {
    if (ready) localStorage.setItem(KEYS.products, JSON.stringify(products));
  }, [ready, products]);
  useEffect(() => {
    if (ready) localStorage.setItem(KEYS.orders, JSON.stringify(orders));
  }, [ready, orders]);
  useEffect(() => {
    //if (ready) localStorage.setItem(KEYS.cart, JSON.stringify(cart));
  //}, [ready, cart]);
  //esto guarda automaticamente el carrito del user
  if (!ready || !currentUser) return;

  localStorage.setItem(
    cartKey(currentUser.id),
    JSON.stringify(cart)
  );
}, [ready, currentUser, cart]);
// fin bloque editado
  const login = useCallback(
    (email: string, password: string) => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
      );
      if (!user || user.password !== password)
        return "Correo o contraseña incorrectos.";
      if (!user.active) return "Esta cuenta se encuentra desactivada.";
      setCurrentUser(user);
      localStorage.setItem(KEYS.session, JSON.stringify(user.id));
      return null;
    },
    [users],
  );
  const register = useCallback(
    (data: Registration) => {
      if (!data.name.trim() || !data.email.trim() || !data.password.trim())
        return "Completa todos los campos obligatorios.";
      if (!/^\S+@\S+\.\S+$/.test(data.email))
        return "Ingresa un correo electrónico válido.";
      if (data.password.length < 8)
        return "La contraseña debe tener al menos 8 caracteres.";
      if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase()))
        return "Ya existe una cuenta con ese correo.";
      const user: User = {
        ...data,
        id: `u-${Date.now()}`,
        role: "client",
        active: true,
      };
      setUsers((l) => [...l, user]);
      setCurrentUser(user);
      localStorage.setItem(KEYS.session, JSON.stringify(user.id));
      return null;
    },
    [users],
  );
  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(KEYS.session);
  }, []);
  const saveProduct = useCallback(
    (data: ProductInput, id?: string) =>
      setProducts((l) =>
        id
          ? l.map((x) => (x.id === id ? { ...data, id } : x))
          : [...l, { ...data, id: `p-${Date.now()}` }],
      ),
    [],
  );
  const deleteProduct = useCallback(
    (id: string) => {
      if (orders.some((o) => o.items.some((i) => i.productId === id)))
        return "No se puede eliminar porque el producto tiene ventas registradas. Puedes desactivarlo.";
      setProducts((l) => l.filter((x) => x.id !== id));
      return null;
    },
    [orders],
  );
  const saveUser = useCallback(
    (data: Omit<User, "id">, id?: string) => {
      if (
        users.some(
          (u) =>
            u.email.toLowerCase() === data.email.toLowerCase() && u.id !== id,
        )
      )
        return "Ese correo ya está registrado.";
      setUsers((l) =>
        id
          ? l.map((x) => (x.id === id ? { ...data, id } : x))
          : [...l, { ...data, id: `u-${Date.now()}` }],
      );
      return null;
    },
    [users],
  );
  const deleteUser = useCallback(
    (id: string) => {
      if (id === currentUser?.id) return "No puedes eliminar tu propia sesión.";
      if (orders.some((o) => o.userId === id))
        return "Este usuario tiene compras registradas. Puedes desactivarlo.";
      setUsers((l) => l.filter((x) => x.id !== id));
      return null;
    },
    [currentUser, orders],
  );
  const updateOrderStatus = useCallback(
    (id: string, status: OrderStatus) =>
      setOrders((l) => l.map((o) => (o.id === id ? { ...o, status } : o))),
    [],
  );
  //const addToCart = useCallback(
  //  (product: Product) => {
  //    const inCart = cart.find((i) => i.id === product.id)?.quantity ?? 0;
  //    if (inCart >= product.stock) return "No hay más unidades disponibles.";
  //    setCart((l) =>
  //      l.some((i) => i.id === product.id)
  //        ? l.map((i) =>
  //            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
  //          )
  //        : [...l, { ...product, quantity: 1 }],
  //    );
  //    return null;
  //  },
  //  [cart],
  //);
  //este bloque valida el stock del producto

  const addToCart = useCallback(
  (product: Product) => {
    const currentProduct = products.find(
      (p) => p.id === product.id
    );

    if (!currentProduct) {
      return "El producto ya no existe.";
    }

    if (!currentProduct.active) {
      return "Este producto no está disponible.";
    }

    if (currentProduct.stock <= 0) {
      return "Este producto está agotado.";
    }

    const currentQuantity =
      cart.find(
        (item) =>
          item.productId === currentProduct.id
      )?.quantity ?? 0;

    if (currentQuantity >= currentProduct.stock) {
      return "No hay más unidades disponibles.";
    }

    setCart((previous) => {
      const exists = previous.some(
        (item) =>
          item.productId === currentProduct.id
      );

      if (exists) {
        return previous.map((item) =>
          item.productId === currentProduct.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          productId: currentProduct.id,
          quantity: 1,
        },
      ];
    });

    return null;
  },
  [cart, products]
);


  const changeCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      const product = products.find((p) => p.id === productId);
      const maxStock = product ? product.stock : 1;

      setCart((l) =>
        l.map((i) =>
          i.productId === productId
            ? { ...i, quantity: Math.max(1, Math.min(quantity, maxStock)) }
            : i,
        ),
      );
    },
    [products],
  );
  const removeFromCart = useCallback(
    //(id: string) => setCart((l) => l.filter((i) => i.id !== id)),
    //[],
    (productId: string) => {
    setCart((previous) =>
      previous.filter(
        (item) => item.productId !== productId
      )
    );
  },
  []
  );
  const createOrder = useCallback(
    (address: string) => {
      if (!currentUser) return "Debes iniciar sesión.";
      if (!address.trim()) return "Ingresa una dirección de entrega.";
      if (!cart.length) return "Tu carrito está vacío.";
      //const unavailable = cart.find(
      //  (i) => (products.find((p) => p.id === i.id)?.stock ?? 0) < i.quantity,
      //);
      //if (unavailable) return `Stock insuficiente para ${unavailable.name}.`;
      //const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
      //const shipping = subtotal >= 45 ? 0 : 3;
      const orderItems: Order["items"] = [];

for (const cartItem of cart) {
  const product = products.find(
    (p) =>
      p.id === cartItem.productId
  );

  if (!product) {
    return "Uno de los productos ya no existe.";
  }

  if (!product.active) {
    return `${product.name} ya no está disponible.`;
  }

  if (
    product.stock <
    cartItem.quantity
  ) {
    return `Stock insuficiente para ${product.name}.`;
  }

  orderItems.push({
    productId: product.id,
    name: product.name,
    price: product.price,
    quantity: cartItem.quantity,
  });
}

const subtotal = orderItems.reduce(
  (total, item) =>
    total +
    item.price * item.quantity,
  0
);

const shipping =
  subtotal >= 45 ? 0 : 3;

const total =
  subtotal + shipping;
      const date = new Date();
      const delivery = new Date(date);
      delivery.setDate(date.getDate() + 3);
     const order: Order = {
        id: `NSV-${String(Date.now()).slice(-4)}`,
        userId: currentUser.id,
        customerName: currentUser.name,
        date: date.toISOString().slice(0, 10),
        deliveryDate: delivery.toISOString().slice(0, 10),
        address: address.trim(),
        status: "Pendiente",
        items: orderItems,
        subtotal,
        shipping,
        total,
      };
      setProducts((l) =>
        l.map((p) => {
          const cartItem = cart.find((x) => x.productId === p.id);
          return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p;
        }),
      );
      setOrders((l) => [order, ...l]);
      setCart([]);
      return null;
    },
    [cart, currentUser, products],
  );
  const resetDemo = useCallback(() => {
    setUsers(seedUsers);
    setProducts(seedProducts);
    setOrders(seedOrders);
    setCart([]);
    setCurrentUser(null);
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  }, []);
  const value = useMemo(
    () => ({
      ready,
      currentUser,
      users,
      products,
      orders,
      cart,
      login,
      register,
      logout,
      saveProduct,
      deleteProduct,
      saveUser,
      deleteUser,
      updateOrderStatus,
      addToCart,
      changeCartQuantity,
      removeFromCart,
      createOrder,
      resetDemo,
    }),
    [
      ready,
      currentUser,
      users,
      products,
      orders,
      cart,
      login,
      register,
      logout,
      saveProduct,
      deleteProduct,
      saveUser,
      deleteUser,
      updateOrderStatus,
      addToCart,
      changeCartQuantity,
      removeFromCart,
      createOrder,
      resetDemo,
    ],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useApp debe utilizarse dentro de AppProvider");
  return value;
}
