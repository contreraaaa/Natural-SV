"use client";
import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import type { Order, OrderStatus, Product, Role, User } from "@/lib/types";
import {
  BarChart3,
  Box,
  ChevronRight,
  ClipboardList,
  Edit3,
  Eye,
  Home,
  Leaf,
  LogOut,
  Menu,
  Minus,
  PackagePlus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Truck,
  UserRound,
  Users,
  X,
} from "lucide-react";

const money = (value: number) =>
  new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" }).format(
    value,
  );
const field =
  "w-full rounded-xl border border-[#d8e2d3] bg-white px-4 py-3 text-[15px] text-[#16261d] placeholder:text-[#8b978f]";
const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50";
const statusColor: Record<OrderStatus, string> = {
  Pendiente: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmado: "bg-blue-50 text-blue-700 border-blue-200",
  "En preparación": "bg-violet-50 text-violet-700 border-violet-200",
  Entregado: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelado: "bg-red-50 text-red-700 border-red-200",
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#5c813b] text-white shadow-[0_8px_22px_rgba(41,84,58,.24)]">
        <Leaf size={24} />
      </div>
      {!compact && (
        <div>
          <div className="font-[var(--font-playfair)] text-2xl font-bold tracking-tight text-[#294c35]">
            Natural<span className="text-[#7b9b43]">SV</span>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[.18em] text-[#778678]">
            Salud · bienestar · equilibrio
          </div>
        </div>
      )}
    </div>
  );
}
function Notice({
  text,
  type = "error",
}: {
  text: string;
  type?: "error" | "success";
}) {
  return (
    <div
      role="alert"
      className={`rounded-xl border px-4 py-3 text-sm ${type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}
    >
      {text}
    </div>
  );
}

function AuthScreen() {
  const { login, register } = useApp();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result =
      mode === "login" ? login(form.email, form.password) : register(form);
    setError(result ?? "");
  }
  function demo(role: Role) {
    setForm((f) => ({
      ...f,
      email: role === "admin" ? "admin@naturalsv.com" : "cliente@naturalsv.com",
      password: role === "admin" ? "Admin123!" : "Cliente123!",
    }));
    setError("");
  }
  return (
    <main className="min-h-screen bg-[#f3f6ee] lg:grid lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-[#244833] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-25 soft-grid" />
        <div className="absolute -right-28 top-24 h-96 w-96 rounded-full border-[72px] border-[#8fad55]/30" />
        <div className="relative">
          <Logo />
          <div className="mt-24 max-w-xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[.22em] text-[#c8da9e]">
              Gestión centralizada
            </p>
            <h1 className="font-[var(--font-playfair)] text-6xl font-semibold leading-[1.04]">
              Tu negocio natural,
              <br />
              más ordenado.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#dce8db]">
              Inventario, ventas, clientes y pedidos en un solo lugar, con
              información lista para tomar mejores decisiones.
            </p>
          </div>
        </div>
        <div className="relative grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
            <Box className="mb-3 text-[#c7df87]" />
            <b>Stock al día</b>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
            <Truck className="mb-3 text-[#c7df87]" />
            <b>Pedidos claros</b>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
            <BarChart3 className="mb-3 text-[#c7df87]" />
            <b>Datos útiles</b>
          </div>
        </div>
      </section>
      <section className="flex min-h-screen items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-md animate-enter">
          <div className="mb-10 lg:hidden">
            <Logo />
          </div>
          <div className="rounded-[28px] border border-[#dce5d8] bg-white p-6 shadow-[0_24px_80px_rgba(39,70,49,.10)] sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[.16em] text-[#6f8e44]">
              Bienvenido a NaturalSV
            </p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-4xl font-semibold">
              {mode === "login" ? "Inicia sesión" : "Crea tu cuenta"}
            </h2>
            <p className="mt-2 text-[#657169]">
              {mode === "login"
                ? "Ingresa para continuar con tus gestiones."
                : "Regístrate como cliente para realizar pedidos."}
            </p>
            <div className="mt-7 grid grid-cols-2 rounded-xl bg-[#f0f4ed] p-1">
              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className={`rounded-lg py-2.5 text-sm font-semibold ${mode === "login" ? "bg-white text-[#2c573b] shadow-sm" : "text-[#718075]"}`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className={`rounded-lg py-2.5 text-sm font-semibold ${mode === "register" ? "bg-white text-[#2c573b] shadow-sm" : "text-[#718075]"}`}
              >
                Registrarme
              </button>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === "register" && (
                <>
                  <label className="block text-sm font-semibold">
                    Nombre completo
                    <input
                      className={`${field} mt-2`}
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Ej. Ana López"
                    />
                  </label>
                  <label className="block text-sm font-semibold">
                    Teléfono
                    <input
                      className={`${field} mt-2`}
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="7000-0000"
                    />
                  </label>
                </>
              )}
              <label className="block text-sm font-semibold">
                Correo electrónico
                <input
                  type="email"
                  className={`${field} mt-2`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                />
              </label>
              <label className="block text-sm font-semibold">
                Contraseña
                <input
                  type="password"
                  className={`${field} mt-2`}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Mínimo 8 caracteres"
                />
              </label>
              {error && <Notice text={error} />}
              <button
                className={`${btn} w-full bg-[#47722f] py-3.5 text-white hover:bg-[#385c25]`}
              >
                {mode === "login" ? "Ingresar al sistema" : "Crear cuenta"}
                <ChevronRight size={18} />
              </button>
            </form>
            {mode === "login" && (
              <div className="mt-6 border-t border-[#e3e9df] pt-5">
                <p className="mb-3 text-center text-xs font-bold uppercase tracking-wider text-[#829086]">
                  Accesos para demostración
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => demo("admin")}
                    className={`${btn} border border-[#d7e2d2] bg-[#f7faf5] text-sm text-[#315c3e] hover:bg-[#edf4e9]`}
                  >
                    <ShieldCheck size={17} />
                    Administrador
                  </button>
                  <button
                    onClick={() => demo("client")}
                    className={`${btn} border border-[#d7e2d2] bg-[#f7faf5] text-sm text-[#315c3e] hover:bg-[#edf4e9]`}
                  >
                    <UserRound size={17} />
                    Cliente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

const adminNav = [
  { id: "dashboard", label: "Resumen", icon: Home },
  { id: "productos", label: "Productos", icon: Box },
  { id: "pedidos", label: "Pedidos", icon: ClipboardList },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "usuarios", label: "Usuarios", icon: ShieldCheck },
];
const clientNav = [
  { id: "catalogo", label: "Catálogo", icon: ShoppingBag },
  { id: "carrito", label: "Mi carrito", icon: ShoppingCart },
  { id: "mis-pedidos", label: "Mis pedidos", icon: Truck },
  { id: "perfil", label: "Mi perfil", icon: UserRound },
];
function Shell({
  section,
  children,
}: {
  section: string;
  children: React.ReactNode;
}) {
  const { currentUser, cart, logout, resetDemo } = useApp();
  const [open, setOpen] = useState(false);
  const nav = currentUser?.role === "admin" ? adminNav : clientNav;
  const active = nav.find((i) => i.id === section) ?? nav[0];
  return (
    <div className="min-h-screen bg-[#f7f9f4]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[270px] border-r border-[#dfe8db] bg-white p-5 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X />
          </button>
        </div>
        <div className="mt-9 rounded-2xl bg-[#edf4e9] p-3">
          <p className="text-xs font-bold uppercase tracking-wider text-[#759068]">
            Sesión activa
          </p>
          <p className="mt-1 truncate font-semibold">{currentUser?.name}</p>
          <p className="text-sm capitalize text-[#6c7a70]">
            {currentUser?.role === "admin" ? "Administrador" : "Cliente"}
          </p>
        </div>
        <nav className="mt-7 space-y-1.5">
          {nav.map(({ id, label, icon: Icon }) => (
            <Link
              key={id}
              href={`/${id}`}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-3 font-semibold transition ${active.id === id ? "bg-[#315f3f] text-white shadow-[0_8px_20px_rgba(49,95,63,.18)]" : "text-[#58665d] hover:bg-[#f0f5ed] hover:text-[#2f5b3c]"}`}
            >
              <Icon size={19} />
              {label}
              {id === "carrito" && cart.length > 0 && (
                <span className="ml-auto grid h-6 min-w-6 place-items-center rounded-full bg-[#a7c957] px-1 text-xs text-[#17301f]">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="absolute inset-x-5 bottom-5 space-y-1">
          <button
            onClick={resetDemo}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#69776d] hover:bg-[#f1f4ef]"
          >
            <RotateCcw size={17} />
            Reiniciar datos demo
          </button>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#a0453d] hover:bg-red-50"
          >
            <LogOut size={17} />
            Cerrar sesión
          </button>
        </div>
      </aside>
      {open && (
        <button
          aria-label="Cerrar menú"
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="lg:pl-[270px]">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#e1e9de] bg-[#f7f9f4]/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#dbe5d7] bg-white lg:hidden"
            >
              <Menu />
            </button>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#789263]">
                NaturalSV
              </p>
              <h1 className="text-xl font-bold sm:text-2xl">{active.label}</h1>
            </div>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{currentUser?.name}</p>
            <p className="text-xs text-[#7a877e]">
              {new Intl.DateTimeFormat("es-SV", {
                weekday: "long",
                day: "numeric",
                month: "long",
              }).format(new Date())}
            </p>
          </div>
        </header>
        <main className="mx-auto max-w-[1450px] p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#dfe8dc] bg-white shadow-[0_8px_30px_rgba(39,70,49,.05)] ${className}`}
    >
      {children}
    </div>
  );
}
function Status({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-bold ${statusColor[status]}`}
    >
      {status}
    </span>
  );
}
function Empty({
  icon: Icon = Box,
  title,
  text,
}: {
  icon?: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="grid min-h-52 place-items-center p-8 text-center">
      <div>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#edf3e9] text-[#608044]">
          <Icon />
        </div>
        <h3 className="mt-3 font-bold">{title}</h3>
        <p className="mt-1 text-sm text-[#748077]">{text}</p>
      </div>
    </div>
  );
}

function Dashboard() {
  const { orders, products, users } = useApp();
  const delivered = orders.filter((o) => o.status === "Entregado");
  const sales = delivered.reduce((s, o) => s + o.total, 0);
  const low = products.filter((p) => p.stock <= p.minStock);
  const quantities = new Map<string, number>();
  orders.forEach((o) =>
    o.items.forEach((i) =>
      quantities.set(i.name, (quantities.get(i.name) ?? 0) + i.quantity),
    ),
  );
  const ranking = [...quantities.entries()].sort((a, b) => b[1] - a[1]);
  const max = Math.max(...ranking.map((r) => r[1]), 1);
  return (
    <div className="animate-enter space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[#66736a]">Vista general del negocio</p>
          <h2 className="mt-1 font-[var(--font-playfair)] text-3xl font-semibold sm:text-4xl">
            Todo bajo control.
          </h2>
        </div>
        <Link href="/pedidos" className={`${btn} bg-[#315f3f] text-white`}>
          Gestionar pedidos
          <ChevronRight size={18} />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Ventas entregadas",
            value: money(sales),
            note: `${delivered.length} pedidos`,
            icon: BarChart3,
          },
          {
            label: "Pedidos activos",
            value: orders.filter(
              (o) => !["Entregado", "Cancelado"].includes(o.status),
            ).length,
            note: "requieren seguimiento",
            icon: Truck,
          },
          {
            label: "Productos",
            value: products.filter((p) => p.active).length,
            note: `${low.length} con stock bajo`,
            icon: Box,
          },
          {
            label: "Clientes",
            value: users.filter((u) => u.role === "client").length,
            note: "registrados",
            icon: Users,
          },
        ].map(({ label, value, note, icon: Icon }) => (
          <Card key={label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-[#6f7c73]">{label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {value}
                </p>
                <p className="mt-1 text-sm text-[#829087]">{note}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf4e9] text-[#4d7336]">
                <Icon size={21} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">Pedidos recientes</p>
              <p className="text-sm text-[#77837b]">
                Estado de las últimas ventas
              </p>
            </div>
            <Link href="/pedidos" className="text-sm font-bold text-[#4f7536]">
              Ver todos
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#e4ebe1] text-[#758078]">
                  <th className="pb-3 font-semibold">Pedido</th>
                  <th className="pb-3 font-semibold">Cliente</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 4).map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-[#edf1eb] last:border-0"
                  >
                    <td className="py-4 font-bold">{o.id}</td>
                    <td className="py-4">{o.customerName}</td>
                    <td className="py-4 font-semibold">{money(o.total)}</td>
                    <td className="py-4">
                      <Status status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="p-5 sm:p-6">
          <p className="font-bold">Productos más vendidos</p>
          <p className="text-sm text-[#77837b]">Unidades acumuladas</p>
          <div className="mt-6 space-y-5">
            {ranking.map(([name, value], index) => (
              <div key={name}>
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span className="truncate font-semibold">
                    {index + 1}. {name}
                  </span>
                  <b>{value}</b>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#eaf0e6]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#4f7b37] to-[#a7c957]"
                    style={{ width: `${(value / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      {low.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/70 p-5">
          <div className="flex gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <Box />
            </div>
            <div>
              <p className="font-bold text-amber-900">
                Inventario que necesita atención
              </p>
              <p className="mt-1 text-sm text-amber-800">
                {low.map((p) => `${p.name} (${p.stock})`).join(" · ")}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product?: Product;
  onClose: () => void;
}) {
  const { saveProduct } = useApp();
  const [form, setForm] = useState({
    name: product?.name ?? "",
    category: product?.category ?? "Bienestar digestivo",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    minStock: product?.minStock ?? 5,
    emoji: product?.emoji ?? "🌿",
    active: product?.active ?? true,
  });
  const [error, setError] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.description.trim() ||
      form.price <= 0 ||
      form.stock < 0
    ) {
      setError("Revisa los campos obligatorios y los valores numéricos.");
      return;
    }
    saveProduct(form, product?.id);
    onClose();
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#102218]/55 p-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#78935e]">
              Inventario
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              {product ? "Editar producto" : "Nuevo producto"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl bg-[#f1f4ef]"
          >
            <X />
          </button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold sm:col-span-2">
            Nombre
            <input
              className={`${field} mt-2`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="text-sm font-semibold">
            Categoría
            <select
              className={`${field} mt-2`}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>Bienestar digestivo</option>
              <option>Suplementos</option>
              <option>Infusiones</option>
              <option>Otros</option>
            </select>
          </label>
          <label className="text-sm font-semibold">
            Ícono
            <input
              className={`${field} mt-2`}
              value={form.emoji}
              onChange={(e) => setForm({ ...form, emoji: e.target.value })}
              maxLength={4}
            />
          </label>
          <label className="text-sm font-semibold">
            Precio ($)
            <input
              type="number"
              min="0"
              step="0.01"
              className={`${field} mt-2`}
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </label>
          <label className="text-sm font-semibold">
            Existencias
            <input
              type="number"
              min="0"
              className={`${field} mt-2`}
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
            />
          </label>
          <label className="text-sm font-semibold">
            Alerta de stock
            <input
              type="number"
              min="0"
              className={`${field} mt-2`}
              value={form.minStock}
              onChange={(e) =>
                setForm({ ...form, minStock: Number(e.target.value) })
              }
            />
          </label>
          <label className="flex items-center gap-3 pt-7 text-sm font-semibold">
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#4f7536]"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
            />
            Producto activo
          </label>
          <label className="text-sm font-semibold sm:col-span-2">
            Descripción
            <textarea
              className={`${field} mt-2 min-h-24 resize-y`}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </label>
        </div>
        {error && (
          <div className="mt-4">
            <Notice text={error} />
          </div>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`${btn} border border-[#dce4d9]`}
          >
            Cancelar
          </button>
          <button className={`${btn} bg-[#315f3f] text-white`}>
            Guardar producto
          </button>
        </div>
      </form>
    </div>
  );
}

function Products() {
  const { products, deleteProduct } = useApp();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const [error, setError] = useState("");
  const shown = products.filter((p) =>
    (p.name + p.category).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="animate-enter space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[#6e7a72]">Catálogo e inventario</p>
          <h2 className="font-[var(--font-playfair)] text-3xl font-semibold">
            Gestión de productos
          </h2>
        </div>
        <button
          onClick={() => setEditing("new")}
          className={`${btn} bg-[#315f3f] text-white`}
        >
          <PackagePlus size={19} />
          Agregar producto
        </button>
      </div>
      {error && <Notice text={error} />}
      <Card>
        <div className="flex flex-col gap-4 border-b border-[#e1e8de] p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block max-w-md flex-1">
            <Search
              className="absolute left-3 top-3 text-[#859188]"
              size={19}
            />
            <input
              className={`${field} pl-10`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o categoría"
            />
          </label>
          <p className="text-sm text-[#758078]">
            {shown.length} productos registrados
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-[#f7f9f5] text-[#6c7970]">
              <tr>
                <th className="px-5 py-3 font-semibold">Producto</th>
                <th className="px-5 py-3 font-semibold">Categoría</th>
                <th className="px-5 py-3 font-semibold">Precio</th>
                <th className="px-5 py-3 font-semibold">Existencias</th>
                <th className="px-5 py-3 font-semibold">Estado</th>
                <th className="px-5 py-3 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((p) => (
                <tr key={p.id} className="border-t border-[#e8ede5]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eef3ea] text-2xl">
                        {p.emoji}
                      </span>
                      <div>
                        <p className="font-bold">{p.name}</p>
                        <p className="max-w-xs truncate text-xs text-[#7b877f]">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">{p.category}</td>
                  <td className="px-5 py-4 font-bold">{money(p.price)}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`font-bold ${p.stock <= p.minStock ? "text-amber-700" : "text-[#315f3f]"}`}
                    >
                      {p.stock}
                    </span>
                    <span className="text-[#89938d]">
                      {" "}
                      / alerta {p.minStock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}
                    >
                      {p.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        aria-label="Editar"
                        onClick={() => setEditing(p)}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-[#edf3e9] text-[#4d7336]"
                      >
                        <Edit3 size={17} />
                      </button>
                      <button
                        aria-label="Eliminar"
                        onClick={() => {
                          const msg = deleteProduct(p.id);
                          setError(msg ?? "");
                        }}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!shown.length && (
            <Empty
              title="Sin coincidencias"
              text="Prueba con otro nombre o categoría."
              icon={Search}
            />
          )}
        </div>
      </Card>
      {editing && (
        <ProductModal
          product={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function OrderDetail({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#102218]/55 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg p-6 sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-[#708167]">
              DETALLE DEL PEDIDO
            </p>
            <h3 className="mt-1 text-2xl font-bold">{order.id}</h3>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl bg-[#f0f3ee]"
          >
            <X />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-[#f4f7f1] p-4 text-sm">
          <div>
            <span className="text-[#768178]">Cliente</span>
            <p className="font-bold">{order.customerName}</p>
          </div>
          <div>
            <span className="text-[#768178]">Entrega</span>
            <p className="font-bold">{order.deliveryDate}</p>
          </div>
          <div className="col-span-2">
            <span className="text-[#768178]">Dirección</span>
            <p className="font-bold">{order.address}</p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {order.items.map((i) => (
            <div
              key={i.productId}
              className="flex justify-between border-b border-[#e6ebe3] pb-3 text-sm"
            >
              <div>
                <b>{i.name}</b>
                <p className="text-[#7d8880]">
                  {i.quantity} × {money(i.price)}
                </p>
              </div>
              <b>{money(i.quantity * i.price)}</b>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <b>{money(order.subtotal)}</b>
          </div>
          <div className="flex justify-between">
            <span>Envío</span>
            <b>{order.shipping ? money(order.shipping) : "Gratis"}</b>
          </div>
          <div className="flex justify-between border-t border-[#dfe6dc] pt-3 text-lg">
            <b>Total</b>
            <b>{money(order.total)}</b>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Orders({ mine = false }: { mine?: boolean }) {
  const { orders, currentUser, updateOrderStatus } = useApp();
  const [status, setStatus] = useState("Todos");
  const [detail, setDetail] = useState<Order | null>(null);
  const base = mine
    ? orders.filter((o) => o.userId === currentUser?.id)
    : orders;
  const shown =
    status === "Todos" ? base : base.filter((o) => o.status === status);
  return (
    <div className="animate-enter space-y-5">
      <div>
        <p className="text-[#6f7b73]">
          {mine ? "Historial y seguimiento" : "Ventas y seguimiento"}
        </p>
        <h2 className="font-[var(--font-playfair)] text-3xl font-semibold">
          {mine ? "Mis pedidos" : "Gestión de pedidos"}
        </h2>
      </div>
      <Card>
        <div className="flex flex-col gap-3 border-b border-[#e3e9e0] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              "Todos",
              "Pendiente",
              "Confirmado",
              "En preparación",
              "Entregado",
              "Cancelado",
            ].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold ${status === s ? "bg-[#315f3f] text-white" : "bg-[#f1f4ef] text-[#69766d]"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <p className="text-sm text-[#758078]">{shown.length} resultados</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-[#f8faf7] text-[#6f7b73]">
              <tr>
                <th className="px-5 py-3">Pedido</th>
                {!mine && <th className="px-5 py-3">Cliente</th>}
                <th className="px-5 py-3">Fecha</th>
                <th className="px-5 py-3">Productos</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Estado</th>
                <th className="px-5 py-3 text-right">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((o) => (
                <tr key={o.id} className="border-t border-[#e7ede4]">
                  <td className="px-5 py-4 font-bold">{o.id}</td>
                  {!mine && <td className="px-5 py-4">{o.customerName}</td>}
                  <td className="px-5 py-4">{o.date}</td>
                  <td className="px-5 py-4">
                    {o.items.reduce((s, i) => s + i.quantity, 0)} unidades
                  </td>
                  <td className="px-5 py-4 font-bold">{money(o.total)}</td>
                  <td className="px-5 py-4">
                    {mine ? (
                      <Status status={o.status} />
                    ) : (
                      <select
                        aria-label={`Estado de ${o.id}`}
                        value={o.status}
                        onChange={(e) =>
                          updateOrderStatus(o.id, e.target.value as OrderStatus)
                        }
                        className={`rounded-lg border px-2.5 py-2 text-xs font-bold ${statusColor[o.status]}`}
                      >
                        {[
                          "Pendiente",
                          "Confirmado",
                          "En preparación",
                          "Entregado",
                          "Cancelado",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setDetail(o)}
                      className="inline-grid h-9 w-9 place-items-center rounded-lg bg-[#edf3e9] text-[#4c7137]"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!shown.length && (
            <Empty
              icon={ClipboardList}
              title="No hay pedidos"
              text="No se encontraron pedidos con este estado."
            />
          )}
        </div>
      </Card>
      {detail && <OrderDetail order={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}

function Customers() {
  const { users, orders } = useApp();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<User | null>(null);
  const clients = users.filter(
    (u) =>
      u.role === "client" &&
      (u.name + u.email).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="animate-enter space-y-5">
      <div>
        <p className="text-[#6f7b73]">Directorio e historial</p>
        <h2 className="font-[var(--font-playfair)] text-3xl font-semibold">
          Clientes
        </h2>
      </div>
      <div className="grid gap-5 xl:grid-cols-[.95fr_1.05fr]">
        <Card>
          <div className="border-b border-[#e4eae1] p-4">
            <label className="relative block">
              <Search
                className="absolute left-3 top-3 text-[#829087]"
                size={19}
              />
              <input
                className={`${field} pl-10`}
                placeholder="Buscar cliente"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>
          <div className="max-h-[620px] overflow-y-auto p-2">
            {clients.map((c) => {
              const clientOrders = orders.filter((o) => o.userId === c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left ${selected?.id === c.id ? "bg-[#edf4e9]" : "hover:bg-[#f6f8f4]"}`}
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#315f3f] font-bold text-white">
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">{c.name}</p>
                    <p className="truncate text-sm text-[#748077]">{c.email}</p>
                  </div>
                  <span className="text-xs font-bold text-[#6e7d71]">
                    {clientOrders.length} compras
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
        <Card>
          {selected ? (
            (() => {
              const history = orders.filter((o) => o.userId === selected.id);
              const spent = history
                .filter((o) => o.status === "Entregado")
                .reduce((s, o) => s + o.total, 0);
              return (
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#eaf2e6] text-xl font-bold text-[#3f6831]">
                      {selected.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selected.name}</h3>
                      <p className="text-sm text-[#77847a]">
                        {selected.phone || "Sin teléfono"} · {selected.email}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#f3f7f0] p-4">
                      <p className="text-sm text-[#748078]">Pedidos</p>
                      <b className="text-2xl">{history.length}</b>
                    </div>
                    <div className="rounded-xl bg-[#f3f7f0] p-4">
                      <p className="text-sm text-[#748078]">
                        Compras entregadas
                      </p>
                      <b className="text-2xl">{money(spent)}</b>
                    </div>
                  </div>
                  <h4 className="mt-7 font-bold">Historial de compras</h4>
                  <div className="mt-3 space-y-2">
                    {history.map((o) => (
                      <div
                        key={o.id}
                        className="flex items-center justify-between rounded-xl border border-[#e2e9df] p-3"
                      >
                        <div>
                          <b>{o.id}</b>
                          <p className="text-xs text-[#7b877f]">
                            {o.date} · {o.items.length} productos
                          </p>
                        </div>
                        <div className="text-right">
                          <b>{money(o.total)}</b>
                          <div className="mt-1">
                            <Status status={o.status} />
                          </div>
                        </div>
                      </div>
                    ))}
                    {!history.length && (
                      <p className="text-sm text-[#7b877f]">
                        Este cliente aún no tiene compras.
                      </p>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            <Empty
              icon={Users}
              title="Selecciona un cliente"
              text="Consulta sus datos y todo su historial de compras."
            />
          )}
        </Card>
      </div>
    </div>
  );
}

function UsersView() {
  const { users, saveUser, deleteUser } = useApp();
  const [editing, setEditing] = useState<User | null>(null);
  const [error, setError] = useState("");
  function toggle(u: User) {
    saveUser({ ...u, active: !u.active }, u.id);
  }
  return (
    <div className="animate-enter space-y-5">
      <div>
        <p className="text-[#6f7b73]">Acceso basado en roles</p>
        <h2 className="font-[var(--font-playfair)] text-3xl font-semibold">
          Gestión de usuarios
        </h2>
      </div>
      {error && <Notice text={error} />}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#f6f9f4] text-[#6e7b72]">
              <tr>
                <th className="px-5 py-3">Usuario</th>
                <th className="px-5 py-3">Rol</th>
                <th className="px-5 py-3">Teléfono</th>
                <th className="px-5 py-3">Acceso</th>
                <th className="px-5 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-[#e6ece3]">
                  <td className="px-5 py-4">
                    <b>{u.name}</b>
                    <p className="text-xs text-[#7b877f]">{u.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#edf3e9] px-2.5 py-1 text-xs font-bold capitalize text-[#4c7138]">
                      {u.role === "admin" ? "Administrador" : "Cliente"}
                    </span>
                  </td>
                  <td className="px-5 py-4">{u.phone || "—"}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggle(u)}
                      className={`rounded-full px-3 py-1 text-xs font-bold ${u.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}
                    >
                      {u.active ? "Activo" : "Inactivo"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditing(u)}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-[#edf3e9] text-[#4d7336]"
                      >
                        <Edit3 size={17} />
                      </button>
                      <button
                        onClick={() => setError(deleteUser(u.id) ?? "")}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-red-50 text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {editing && <UserModal user={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}
function UserModal({ user, onClose }: { user: User; onClose: () => void }) {
  const { saveUser } = useApp();
  const [form, setForm] = useState({ ...user });
  const [error, setError] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !/^\S+@\S+\.\S+$/.test(form.email) ||
      form.password.length < 8
    ) {
      setError("Revisa nombre, correo y contraseña (mínimo 8 caracteres).");
      return;
    }
    const result = saveUser(
      {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        phone: form.phone,
        active: form.active,
      },
      user.id,
    );
    if (result) setError(result);
    else onClose();
  }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#102218]/55 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-lg rounded-3xl bg-white p-7"
      >
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold">Editar usuario</h3>
          <button type="button" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <input
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nombre"
          />
          <input
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Correo"
          />
          <input
            className={field}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Teléfono"
          />
          <select
            className={field}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
          >
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          {error && <Notice text={error} />}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className={`${btn} border`}>
            Cancelar
          </button>
          <button className={`${btn} bg-[#315f3f] text-white`}>Guardar</button>
        </div>
      </form>
    </div>
  );
}

function Catalog() {
  const { products, addToCart, cart } = useApp();
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const active = products.filter(
    (p) =>
      p.active &&
      (p.name + p.category).toLowerCase().includes(query.toLowerCase()),
  );
  function add(p: Product) {
    const result = addToCart(p);
    setMessage(result ?? `${p.name} se agregó al carrito.`);
    setTimeout(() => setMessage(""), 2200);
  }
  return (
    <div className="animate-enter space-y-6">
      <section className="relative overflow-hidden rounded-[28px] bg-[#294f37] p-6 text-white soft-grid sm:p-9">
        <div className="relative max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#c8dc95]">
            Catálogo NaturalSV
          </p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-4xl font-semibold sm:text-5xl">
            Bienestar natural para tu rutina.
          </h2>
          <p className="mt-4 max-w-xl text-[#dce8db]">
            Elige tus productos, revisa existencias en tiempo real y recibe
            seguimiento de tu pedido.
          </p>
          <label className="relative mt-6 block max-w-lg text-[#18251d]">
            <Search
              className="absolute left-4 top-3.5 text-[#718077]"
              size={20}
            />
            <input
              className="w-full rounded-xl bg-white py-3.5 pl-11 pr-4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué producto buscas?"
            />
          </label>
        </div>
      </section>
      {message && (
        <Notice
          text={message}
          type={message.includes("agregó") ? "success" : "error"}
        />
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Productos disponibles</h3>
        <Link
          href="/carrito"
          className="flex items-center gap-2 text-sm font-bold text-[#4d7336]"
        >
          <ShoppingCart size={18} />
          {cart.reduce((s, i) => s + i.quantity, 0)} en el carrito
        </Link>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {active.map((p) => (
          <Card key={p.id} className="group overflow-hidden">
            <div className="grid h-44 place-items-center bg-gradient-to-br from-[#eff4e9] to-[#dce8d2] text-7xl transition group-hover:scale-[1.02]">
              {p.emoji}
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#78915f]">
                {p.category}
              </p>
              <h4 className="mt-2 text-xl font-bold">{p.name}</h4>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[#6e7b73]">
                {p.description}
              </p>
              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#2f5b3c]">
                    {money(p.price)}
                  </p>
                  <p
                    className={`text-xs font-semibold ${p.stock <= p.minStock ? "text-amber-700" : "text-[#7b877f]"}`}
                  >
                    {p.stock > 0 ? `${p.stock} disponibles` : "Agotado"}
                  </p>
                </div>
                <button
                  disabled={p.stock === 0}
                  onClick={() => add(p)}
                  className={`${btn} bg-[#4e7737] text-white hover:bg-[#3d612a]`}
                >
                  <Plus size={18} />
                  Agregar
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Cart() {
  const { cart, changeCartQuantity, removeFromCart, createOrder } = useApp();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 45 ? 0 : 3;
  function checkout() {
    const result = createOrder(address);
    if (result) {
      setError(result);
      setSuccess("");
    } else {
      setError("");
      setSuccess(
        "¡Pedido creado correctamente! Ya puedes seguir su estado en Mis pedidos.",
      );
      setAddress("");
    }
  }
  return (
    <div className="animate-enter space-y-5">
      <div>
        <p className="text-[#6f7b73]">Revisa antes de confirmar</p>
        <h2 className="font-[var(--font-playfair)] text-3xl font-semibold">
          Mi carrito
        </h2>
      </div>
      {error && <Notice text={error} />}{" "}
      {success && <Notice text={success} type="success" />}
      {!cart.length ? (
        <Card>
          <Empty
            icon={ShoppingCart}
            title="Tu carrito está vacío"
            text="Agrega productos desde el catálogo para realizar una compra."
          />
          <div className="pb-7 text-center">
            <Link href="/catalogo" className={`${btn} bg-[#315f3f] text-white`}>
              Ver catálogo
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1fr_390px]">
          <Card className="p-4 sm:p-6">
            <div className="space-y-3">
              {cart.map((i) => (
                <div
                  key={i.id}
                  className="flex flex-col gap-4 rounded-2xl border border-[#e1e8de] p-4 sm:flex-row sm:items-center"
                >
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[#edf3e8] text-3xl">
                    {i.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{i.name}</p>
                    <p className="text-sm text-[#77847a]">
                      {money(i.price)} c/u · {i.stock} disponibles
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeCartQuantity(i.id, i.quantity - 1)}
                      className="grid h-9 w-9 place-items-center rounded-lg border"
                    >
                      <Minus size={16} />
                    </button>
                    <b className="w-8 text-center">{i.quantity}</b>
                    <button
                      onClick={() => changeCartQuantity(i.id, i.quantity + 1)}
                      className="grid h-9 w-9 place-items-center rounded-lg border"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <b className="w-24 text-right">
                    {money(i.price * i.quantity)}
                  </b>
                  <button
                    onClick={() => removeFromCart(i.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
          <Card className="h-fit p-6">
            <h3 className="text-xl font-bold">Resumen</h3>
            <label className="mt-5 block text-sm font-semibold">
              Dirección de entrega
              <textarea
                className={`${field} mt-2 min-h-24`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Municipio, departamento y dirección"
              />
            </label>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <b>{shipping ? money(shipping) : "Gratis"}</b>
              </div>
              <div className="flex justify-between border-t border-[#dfe6dc] pt-4 text-lg">
                <b>Total</b>
                <b>{money(subtotal + shipping)}</b>
              </div>
            </div>
            {subtotal < 45 && (
              <p className="mt-3 text-xs text-[#748078]">
                Agrega {money(45 - subtotal)} más para obtener envío gratis.
              </p>
            )}
            <button
              onClick={checkout}
              className={`${btn} mt-5 w-full bg-[#315f3f] py-3.5 text-white`}
            >
              Confirmar pedido
              <ChevronRight size={18} />
            </button>
          </Card>
        </div>
      )}
    </div>
  );
}
function Profile() {
  const { currentUser } = useApp();
  return (
    <div className="mx-auto max-w-2xl animate-enter">
      <Card className="overflow-hidden">
        <div className="h-28 bg-[#294f37] soft-grid" />
        <div className="p-6 sm:p-8">
          <div className="-mt-16 grid h-20 w-20 place-items-center rounded-2xl border-4 border-white bg-[#a7c957] text-2xl font-bold text-[#213c2b]">
            {currentUser?.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <h2 className="mt-4 text-2xl font-bold">{currentUser?.name}</h2>
          <p className="text-[#748078]">Cuenta de cliente</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f3f6f0] p-4">
              <p className="text-xs font-bold uppercase text-[#7b887e]">
                Correo
              </p>
              <p className="mt-1 font-semibold">{currentUser?.email}</p>
            </div>
            <div className="rounded-xl bg-[#f3f6f0] p-4">
              <p className="text-xs font-bold uppercase text-[#7b887e]">
                Teléfono
              </p>
              <p className="mt-1 font-semibold">
                {currentUser?.phone || "Sin registrar"}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function NaturalSVApp({ section }: { section: string }) {
  const { ready, currentUser } = useApp();
  if (!ready)
    return (
      <div className="grid min-h-screen place-items-center bg-[#f3f6ee]">
        <div className="animate-pulse">
          <Logo />
        </div>
      </div>
    );
  if (!currentUser) return <AuthScreen />;
  const allowed =
    currentUser.role === "admin"
      ? adminNav.map((i) => i.id)
      : clientNav.map((i) => i.id);
  const resolved = allowed.includes(section) ? section : allowed[0];
  let content: React.ReactNode;
  if (resolved === "dashboard") content = <Dashboard />;
  else if (resolved === "productos") content = <Products />;
  else if (resolved === "pedidos") content = <Orders />;
  else if (resolved === "clientes") content = <Customers />;
  else if (resolved === "usuarios") content = <UsersView />;
  else if (resolved === "catalogo") content = <Catalog />;
  else if (resolved === "carrito") content = <Cart />;
  else if (resolved === "mis-pedidos") content = <Orders mine />;
  else content = <Profile />;
  return <Shell section={resolved}>{content}</Shell>;
}
