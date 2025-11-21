// Tipos y enums del sistema

export type UserRole = 'administrador' | 'gerente_almacen' | 'almacenero' | 'comprador';

export interface User {
  id: string;
  username: string;
  nombre: string;
  email: string;
  id_cargo: string;
  rol: UserRole;
  activo: boolean;
}

export interface Almacen {
  id_almacen: string;
  nombre: string;
  codigo: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  capacidad_m3: number;
  activo: boolean;
  fecha_creacion: string;
  responsable: string;
}

export interface Cargo {
  id_cargo: string;
  tipo_cargo: string;
  fecha_creacion: string;
  activo: boolean;
}

export interface Material {
  id_material: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  id_categoria: string;
  id_unidad: string;
  precio_unitario: number;
  stock_minimo: number;
  stock_maximo: number;
  stock_actual: number;
  ubicacion_almacen: string;
  activo: boolean;
}

export interface Entrada {
  id_entrada: string;
  numero_entrada: string;
  id_almacen: string;
  id_orden_compra: string;
  id_empleado_recibe: string;
  fecha_entrada: string;
  tipo_entrada: string;
  observaciones: string;
  fecha_creacion: string;
}

export interface Salida {
  id_salida: string;
  numero_salida: string;
  id_almacen: string;
  id_proyecto: string;
  id_empleado_autoriza: string;
  id_empleado_retira: string;
  fecha_salida: string;
  tipo_salida: string;
  observaciones: string;
  activo: boolean;
}

export interface Transferencia {
  id_transferencia: string;
  numero_transferencia: string;
  id_almacen_origen: string;
  id_almacen_destino: string;
  id_empleado_autoriza: string;
  fecha_transferencia: string;
  observaciones: string;
  estado: 'pendiente' | 'en_transito' | 'completada' | 'cancelada';
}

export interface OrdenCompra {
  id_orden: string;
  numero_orden: string;
  id_proveedor: string;
  fecha_orden: string;
  estado: 'borrador' | 'enviada' | 'recibida' | 'cancelada';
  total: number;
  observaciones: string;
}

export interface Proveedor {
  id_proveedor: string;
  nombre: string;
  ruc: string;
  telefono: string;
  email: string;
  direccion: string;
  activo: boolean;
}
