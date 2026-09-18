export type Role = "admin" | "client";
export type OrderStatus =
  "Pendiente" | "Confirmado" | "En preparación" | "Entregado" | "Cancelado";
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  active: boolean;
}
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  minStock: number;
  emoji: string;
  active: boolean;
}
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
export interface Order {
  id: string;
  userId: string;
  customerName: string;
  date: string;
  deliveryDate: string;
  address: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}
export interface CartItem {
  productId: string;
  quantity: number;
}
