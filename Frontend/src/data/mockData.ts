import { User, Almacen, Cargo, Material, Entrada, Salida, Transferencia, OrdenCompra, Proveedor } from '../types';

// Usuarios de demostración
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    nombre: 'Carlos Administrador',
    email: 'admin@inventario.com',
    id_cargo: '1',
    rol: 'administrador',
    activo: true
  },
  {
    id: '2',
    username: 'gerente',
    nombre: 'María Gerente',
    email: 'gerente@inventario.com',
    id_cargo: '2',
    rol: 'gerente_almacen',
    activo: true
  },
  {
    id: '3',
    username: 'almacenero',
    nombre: 'Juan Almacenero',
    email: 'almacenero@inventario.com',
    id_cargo: '3',
    rol: 'almacenero',
    activo: true
  },
  {
    id: '4',
    username: 'comprador',
    nombre: 'Ana Compradora',
    email: 'comprador@inventario.com',
    id_cargo: '4',
    rol: 'comprador',
    activo: true
  }
];

// Contraseñas: todos tienen 'password123'
export const mockCredentials: Record<string, string> = {
  'admin': 'password123',
  'gerente': 'password123',
  'almacenero': 'password123',
  'comprador': 'password123'
};

export const mockCargos: Cargo[] = [
  { id_cargo: '1', tipo_cargo: 'Administrador de Sistema', fecha_creacion: '2024-01-01', activo: true },
  { id_cargo: '2', tipo_cargo: 'Gerente de Almacén', fecha_creacion: '2024-01-01', activo: true },
  { id_cargo: '3', tipo_cargo: 'Almacenero', fecha_creacion: '2024-01-01', activo: true },
  { id_cargo: '4', tipo_cargo: 'Comprador', fecha_creacion: '2024-01-01', activo: true },
  { id_cargo: '5', tipo_cargo: 'Supervisor de Inventario', fecha_creacion: '2024-01-05', activo: true }
];

export const mockAlmacenes: Almacen[] = [
  {
    id_almacen: '1',
    nombre: 'Almacén Central',
    codigo: 'ALM-001',
    direccion: 'Av. Industrial 123',
    ciudad: 'Lima',
    telefono: '01-2345678',
    capacidad_m3: 5000,
    activo: true,
    fecha_creacion: '2024-01-15',
    responsable: 'María Gerente'
  },
  {
    id_almacen: '2',
    nombre: 'Almacén Norte',
    codigo: 'ALM-002',
    direccion: 'Jr. Los Pinos 456',
    ciudad: 'Trujillo',
    telefono: '044-123456',
    capacidad_m3: 3000,
    activo: true,
    fecha_creacion: '2024-02-01',
    responsable: 'Pedro Supervisor'
  },
  {
    id_almacen: '3',
    nombre: 'Almacén Sur',
    codigo: 'ALM-003',
    direccion: 'Calle Comercio 789',
    ciudad: 'Arequipa',
    telefono: '054-987654',
    capacidad_m3: 2500,
    activo: true,
    fecha_creacion: '2024-02-15',
    responsable: 'Luis Coordinador'
  }
];

export const mockMateriales: Material[] = [
  {
    id_material: '1',
    codigo: 'MAT-001',
    nombre: 'Cemento Portland Tipo I',
    descripcion: 'Bolsa de 42.5 kg',
    id_categoria: '1',
    id_unidad: '1',
    precio_unitario: 28.50,
    stock_minimo: 100,
    stock_maximo: 500,
    stock_actual: 350,
    ubicacion_almacen: 'A-01-01',
    activo: true
  },
  {
    id_material: '2',
    codigo: 'MAT-002',
    nombre: 'Fierro Corrugado 1/2"',
    descripcion: 'Varilla de 9 metros',
    id_categoria: '2',
    id_unidad: '2',
    precio_unitario: 42.00,
    stock_minimo: 50,
    stock_maximo: 300,
    stock_actual: 180,
    ubicacion_almacen: 'B-02-03',
    activo: true
  },
  {
    id_material: '3',
    codigo: 'MAT-003',
    nombre: 'Ladrillo King Kong',
    descripcion: '18 huecos',
    id_categoria: '1',
    id_unidad: '3',
    precio_unitario: 0.85,
    stock_minimo: 1000,
    stock_maximo: 5000,
    stock_actual: 850,
    ubicacion_almacen: 'C-01-01',
    activo: true
  },
  {
    id_material: '4',
    codigo: 'MAT-004',
    nombre: 'Pintura Látex Blanco',
    descripcion: 'Galón',
    id_categoria: '3',
    id_unidad: '4',
    precio_unitario: 65.00,
    stock_minimo: 20,
    stock_maximo: 100,
    stock_actual: 45,
    ubicacion_almacen: 'D-03-02',
    activo: true
  },
  {
    id_material: '5',
    codigo: 'MAT-005',
    nombre: 'Arena Gruesa',
    descripcion: 'Metro cúbico',
    id_categoria: '1',
    id_unidad: '5',
    precio_unitario: 85.00,
    stock_minimo: 10,
    stock_maximo: 50,
    stock_actual: 8,
    ubicacion_almacen: 'E-01-01',
    activo: true
  }
];

export const mockEntradas: Entrada[] = [
  {
    id_entrada: '1',
    numero_entrada: 'ENT-2025-001',
    id_almacen: '1',
    id_orden_compra: 'OC-001',
    id_empleado_recibe: '3',
    fecha_entrada: '2025-11-15',
    tipo_entrada: 'Compra',
    observaciones: 'Recepción completa',
    fecha_creacion: '2025-11-15T10:30:00'
  },
  {
    id_entrada: '2',
    numero_entrada: 'ENT-2025-002',
    id_almacen: '1',
    id_orden_compra: 'OC-002',
    id_empleado_recibe: '3',
    fecha_entrada: '2025-11-16',
    tipo_entrada: 'Compra',
    observaciones: 'Material en buen estado',
    fecha_creacion: '2025-11-16T14:15:00'
  },
  {
    id_entrada: '3',
    numero_entrada: 'ENT-2025-003',
    id_almacen: '2',
    id_orden_compra: 'OC-003',
    id_empleado_recibe: '3',
    fecha_entrada: '2025-11-17',
    tipo_entrada: 'Transferencia',
    observaciones: 'Transferencia desde almacén central',
    fecha_creacion: '2025-11-17T09:00:00'
  }
];

export const mockSalidas: Salida[] = [
  {
    id_salida: '1',
    numero_salida: 'SAL-2025-001',
    id_almacen: '1',
    id_proyecto: 'PROY-001',
    id_empleado_autoriza: '2',
    id_empleado_retira: '3',
    fecha_salida: '2025-11-16',
    tipo_salida: 'Proyecto',
    observaciones: 'Material para obra Plaza Mayor',
    activo: true
  },
  {
    id_salida: '2',
    numero_salida: 'SAL-2025-002',
    id_almacen: '1',
    id_proyecto: 'PROY-002',
    id_empleado_autoriza: '2',
    id_empleado_retira: '3',
    fecha_salida: '2025-11-17',
    tipo_salida: 'Proyecto',
    observaciones: 'Material para mantenimiento',
    activo: true
  },
  {
    id_salida: '3',
    numero_salida: 'SAL-2025-003',
    id_almacen: '2',
    id_proyecto: 'PROY-003',
    id_empleado_autoriza: '2',
    id_empleado_retira: '3',
    fecha_salida: '2025-11-18',
    tipo_salida: 'Transferencia',
    observaciones: 'Transferencia a almacén sur',
    activo: true
  }
];

export const mockTransferencias: Transferencia[] = [
  {
    id_transferencia: '1',
    numero_transferencia: 'TRF-2025-001',
    id_almacen_origen: '1',
    id_almacen_destino: '2',
    id_empleado_autoriza: '2',
    fecha_transferencia: '2025-11-17',
    observaciones: 'Reubicación de stock',
    estado: 'completada'
  },
  {
    id_transferencia: '2',
    numero_transferencia: 'TRF-2025-002',
    id_almacen_origen: '1',
    id_almacen_destino: '3',
    id_empleado_autoriza: '2',
    fecha_transferencia: '2025-11-18',
    observaciones: 'Abastecimiento almacén sur',
    estado: 'en_transito'
  },
  {
    id_transferencia: '3',
    numero_transferencia: 'TRF-2025-003',
    id_almacen_origen: '2',
    id_almacen_destino: '3',
    id_empleado_autoriza: '2',
    fecha_transferencia: '2025-11-19',
    observaciones: 'Pendiente de confirmación',
    estado: 'pendiente'
  }
];

export const mockProveedores: Proveedor[] = [
  {
    id_proveedor: '1',
    nombre: 'Distribuidora Construcción S.A.',
    ruc: '20123456789',
    telefono: '01-4567890',
    email: 'ventas@distconstruccion.com',
    direccion: 'Av. Argentina 1234',
    activo: true
  },
  {
    id_proveedor: '2',
    nombre: 'Materiales del Norte E.I.R.L.',
    ruc: '20987654321',
    telefono: '044-234567',
    email: 'contacto@matnorte.com',
    direccion: 'Jr. Independencia 567',
    activo: true
  },
  {
    id_proveedor: '3',
    nombre: 'Grupo Ferretero Industrial',
    ruc: '20456789123',
    telefono: '01-8901234',
    email: 'info@grupoferretero.com',
    direccion: 'Calle Los Industriales 890',
    activo: true
  }
];

export const mockOrdenesCompra: OrdenCompra[] = [
  {
    id_orden: '1',
    numero_orden: 'OC-2025-001',
    id_proveedor: '1',
    fecha_orden: '2025-11-10',
    estado: 'recibida',
    total: 15750.00,
    observaciones: 'Orden completa recibida'
  },
  {
    id_orden: '2',
    numero_orden: 'OC-2025-002',
    id_proveedor: '2',
    fecha_orden: '2025-11-12',
    estado: 'enviada',
    total: 8500.00,
    observaciones: 'Pendiente de recepción'
  },
  {
    id_orden: '3',
    numero_orden: 'OC-2025-003',
    id_proveedor: '3',
    fecha_orden: '2025-11-15',
    estado: 'borrador',
    total: 22300.00,
    observaciones: 'En proceso de aprobación'
  }
];
