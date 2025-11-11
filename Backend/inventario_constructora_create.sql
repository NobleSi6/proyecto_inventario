-- Created by Redgate Data Modeler (https://datamodeler.redgate-platform.com)
-- Last modification date: 2025-10-17 13:29:27.841

-- tables
-- Table: almacenes
CREATE TABLE almacenes (
    id_almacen serial  NOT NULL,
    nombre varchar(150)  NOT NULL,
    codigo varchar(50)  NULL,
    direccion text  NULL,
    ciudad varchar(100)  NULL,
    telefono varchar(20)  NULL,
    capacidad_m3 numeric(10,2)  NULL,
    activo boolean  NULL DEFAULT true,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    responsable int  NOT NULL,
    CONSTRAINT AK_5 UNIQUE (codigo) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT almacenes_pk PRIMARY KEY (id_almacen)
);

-- Table: cargo
CREATE TABLE cargo (
    id_cargo serial  NOT NULL,
    tipo_cargo varchar(100)  NOT NULL,
    fecha_creacion date  NOT NULL,
    activo boolean  NOT NULL,
    CONSTRAINT cargo_pk PRIMARY KEY (id_cargo)
);

-- Table: categorias
CREATE TABLE categorias (
    id_categoria serial  NOT NULL,
    nombre varchar(100)  NOT NULL,
    descripcion text  NULL,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    activo boolean  NULL DEFAULT true,
    CONSTRAINT AK_0 UNIQUE (nombre) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT categorias_pk PRIMARY KEY (id_categoria)
);

-- Table: detalle_entrada
CREATE TABLE detalle_entrada (
    id_detalle_entrada serial  NOT NULL,
    id_entrada integer  NULL,
    id_material integer  NULL,
    cantidad numeric(12,2)  NOT NULL,
    precio_unitario numeric(12,2)  NULL,
    lote varchar(50)  NULL,
    fecha_vencimiento date  NULL,
    observaciones text  NULL,
    activo boolean  NOT NULL,
    CONSTRAINT detalle_entrada_pk PRIMARY KEY (id_detalle_entrada)
);

-- Table: detalle_orden_compra
CREATE TABLE detalle_orden_compra (
    id_detalle serial  NOT NULL,
    id_orden_compra integer  NULL,
    id_material integer  NULL,
    cantidad numeric(12,2)  NOT NULL,
    precio_unitario numeric(12,2)  NOT NULL,
    subtotal numeric(12,2)  NOT NULL,
    observaciones text  NULL,
    activo boolean  NOT NULL,
    CONSTRAINT detalle_orden_compra_pk PRIMARY KEY (id_detalle)
);

-- Table: detalle_salida
CREATE TABLE detalle_salida (
    id_detalle_salida serial  NOT NULL,
    id_salida integer  NULL,
    id_material integer  NULL,
    cantidad numeric(12,2)  NOT NULL,
    observaciones text  NULL,
    activo boolean  NOT NULL,
    CONSTRAINT detalle_salida_pk PRIMARY KEY (id_detalle_salida)
);

-- Table: detalle_transferencia
CREATE TABLE detalle_transferencia (
    id_detalle_transferencia serial  NOT NULL,
    id_transferencia integer  NULL,
    id_material integer  NULL,
    cantidad numeric(12,2)  NOT NULL,
    cantidad_recibida numeric(12,2)  NULL,
    observaciones text  NULL,
    activo boolean  NOT NULL,
    CONSTRAINT detalle_transferencia_pk PRIMARY KEY (id_detalle_transferencia)
);

-- Table: empleados
CREATE TABLE empleados (
    id_empleado serial  NOT NULL,
    codigo varchar(50)  NULL,
    nombres varchar(100)  NOT NULL,
    ap_paterno varchar(100)  NOT NULL,
    ap_materno varchar(100)  NULL,
    ci varchar(20)  NULL,
    cargo int  NOT NULL,
    telefono varchar(20)  NULL,
    email varchar(100)  NULL,
    fecha_contratacion date  NULL,
    activo boolean  NULL DEFAULT true,
    fecha_registro timestamp  NULL DEFAULT current_timestamp,
    id_usuario int  NOT NULL,
    CONSTRAINT AK_8 UNIQUE (codigo) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT AK_9 UNIQUE (ci) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT empleados_pk PRIMARY KEY (id_empleado)
);

-- Table: entradas_inventario
CREATE TABLE entradas_inventario (
    id_entrada serial  NOT NULL,
    numero_entrada varchar(50)  NOT NULL,
    id_almacen integer  NULL,
    id_orden_compra integer  NULL,
    id_empleado_recibe integer  NULL,
    fecha_entrada date  NOT NULL DEFAULT current_date,
    tipo_entrada varchar(50)  NULL DEFAULT 'compra',
    observaciones text  NULL,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    CONSTRAINT AK_11 UNIQUE (numero_entrada) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT entradas_inventario_pk PRIMARY KEY (id_entrada)
);

CREATE INDEX idx_entradas_almacen on entradas_inventario (id_almacen ASC);

-- Table: estados
CREATE TABLE estados (
    id_estado serial  NOT NULL,
    tipo_estado varchar(50)  NOT NULL,
    activo boolean  NOT NULL,
    CONSTRAINT estados_pk PRIMARY KEY (id_estado)
);

-- Table: historial_movimientos
CREATE TABLE historial_movimientos (
    id_movimiento serial  NOT NULL,
    id_material integer  NULL,
    id_almacen integer  NULL,
    tipo_movimiento varchar(50)  NOT NULL,
    cantidad numeric(12,2)  NOT NULL,
    stock_anterior numeric(12,2)  NULL,
    stock_nuevo numeric(12,2)  NULL,
    referencia varchar(100)  NULL,
    id_empleado integer  NULL,
    fecha_movimiento timestamp  NULL DEFAULT current_timestamp,
    observaciones text  NULL,
    activo boolean  NOT NULL,
    CONSTRAINT historial_movimientos_pk PRIMARY KEY (id_movimiento)
);

CREATE INDEX idx_historial_material on historial_movimientos (id_material ASC);

CREATE INDEX idx_historial_fecha on historial_movimientos (fecha_movimiento ASC);

-- Table: materiales
CREATE TABLE materiales (
    id_material serial  NOT NULL,
    codigo varchar(50)  NOT NULL,
    nombre varchar(200)  NOT NULL,
    descripcion text  NULL,
    id_categoria integer  NULL,
    id_unidad integer  NULL,
    precio_unitario numeric(12,2)  NULL,
    stock_minimo integer  NULL DEFAULT 0,
    stock_maximo integer  NULL,
    ubicacion_almacen varchar(100)  NULL,
    activo boolean  NULL DEFAULT true,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    CONSTRAINT AK_4 UNIQUE (codigo) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT materiales_pk PRIMARY KEY (id_material)
);

CREATE INDEX idx_materiales_categoria on materiales (id_categoria ASC);

CREATE INDEX idx_materiales_codigo on materiales (codigo ASC);

-- Table: ordenes_compra
CREATE TABLE ordenes_compra (
    id_orden_compra serial  NOT NULL,
    numero_orden varchar(50)  NOT NULL,
    id_proveedor integer  NULL,
    id_proyecto integer  NULL,
    id_empleado_solicita integer  NULL,
    fecha_orden date  NOT NULL DEFAULT current_date,
    fecha_entrega_estimada date  NULL,
    fecha_entrega_real date  NULL,
    subtotal numeric(12,2)  NULL,
    impuestos numeric(12,2)  NULL,
    total numeric(12,2)  NULL,
    observaciones text  NULL,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    estado int  NOT NULL,
    activo boolean  NOT NULL,
    CONSTRAINT AK_10 UNIQUE (numero_orden) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT ordenes_compra_pk PRIMARY KEY (id_orden_compra)
);

CREATE INDEX idx_ordenes_proveedor on ordenes_compra (id_proveedor ASC);

CREATE INDEX idx_ordenes_proyecto on ordenes_compra (id_proyecto ASC);

-- Table: proveedores
CREATE TABLE proveedores (
    id_proveedor serial  NOT NULL,
    nombre_empresa varchar(200)  NOT NULL,
    nit varchar(20)  NULL,
    telefono varchar(20)  NULL,
    email varchar(100)  NULL,
    direccion text  NULL,
    ciudad varchar(100)  NULL,
    pais varchar(100)  NULL DEFAULT 'bolivia',
    contacto_nombre varchar(150)  NULL,
    contacto_telefono varchar(20)  NULL,
    activo boolean  NULL DEFAULT true,
    fecha_registro timestamp  NULL DEFAULT current_timestamp,
    CONSTRAINT AK_1 UNIQUE (nit) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT proveedores_pk PRIMARY KEY (id_proveedor)
);

-- Table: proyectos
CREATE TABLE proyectos (
    id_proyecto serial  NOT NULL,
    codigo varchar(50)  NOT NULL,
    nombre varchar(200)  NOT NULL,
    descripcion text  NULL,
    direccion text  NULL,
    ciudad varchar(100)  NULL,
    fecha_inicio date  NULL,
    fecha_fin_estimada date  NULL,
    fecha_fin_real date  NULL,
    presupuesto numeric(15,2)  NULL,
    activo boolean  NULL DEFAULT true,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    responsable int  NOT NULL,
    estado int  NOT NULL,
    CONSTRAINT AK_7 UNIQUE (codigo) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT proyectos_pk PRIMARY KEY (id_proyecto)
);

-- Table: salidas_inventario
CREATE TABLE salidas_inventario (
    id_salida serial  NOT NULL,
    numero_salida varchar(50)  NOT NULL,
    id_almacen integer  NULL,
    id_proyecto integer  NULL,
    id_empleado_autoriza integer  NULL,
    id_empleado_retira integer  NULL,
    fecha_salida date  NOT NULL DEFAULT current_date,
    tipo_salida varchar(50)  NULL DEFAULT 'uso en proyecto',
    observaciones text  NULL,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    activo boolean  NOT NULL,
    CONSTRAINT AK_12 UNIQUE (numero_salida) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT salidas_inventario_pk PRIMARY KEY (id_salida)
);

CREATE INDEX idx_salidas_almacen on salidas_inventario (id_almacen ASC);

CREATE INDEX idx_salidas_proyecto on salidas_inventario (id_proyecto ASC);

-- Table: stock_almacen
CREATE TABLE stock_almacen (
    id_stock serial  NOT NULL,
    id_material integer  NULL,
    id_almacen integer  NULL,
    cantidad_disponible numeric(12,2)  NULL DEFAULT 0,
    cantidad_reservada numeric(12,2)  NULL DEFAULT 0,
    ultima_actualizacion timestamp  NULL DEFAULT current_timestamp,
    activo boolean  NOT NULL,
    CONSTRAINT AK_6 UNIQUE (id_material, id_almacen) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT stock_almacen_pk PRIMARY KEY (id_stock)
);

CREATE INDEX idx_stock_material on stock_almacen (id_material ASC);

CREATE INDEX idx_stock_almacen on stock_almacen (id_almacen ASC);

-- Table: transferencias
CREATE TABLE transferencias (
    id_transferencia serial  NOT NULL,
    numero_transferencia varchar(50)  NOT NULL,
    id_almacen_origen integer  NULL,
    id_almacen_destino integer  NULL,
    id_empleado_autoriza integer  NULL,
    fecha_transferencia date  NOT NULL DEFAULT current_date,
    fecha_recepcion date  NULL,
    observaciones text  NULL,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    estado int  NOT NULL,
    id_empleado_solicitante int  NOT NULL,
    activo boolean  NOT NULL,
    CONSTRAINT AK_13 UNIQUE (numero_transferencia) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT transferencias_pk PRIMARY KEY (id_transferencia)
);

-- Table: unidades_medida
CREATE TABLE unidades_medida (
    id_unidad serial  NOT NULL,
    nombre varchar(50)  NOT NULL,
    abreviatura varchar(10)  NOT NULL,
    tipo varchar(50)  NULL,
    activo boolean  NOT NULL,
    CONSTRAINT AK_2 UNIQUE (nombre) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT AK_3 UNIQUE (abreviatura) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT unidades_medida_pk PRIMARY KEY (id_unidad)
);

-- Table: usuarios
CREATE TABLE usuarios (
    id_usuario serial  NOT NULL,
    username varchar(30)  NOT NULL,
    password varchar(200)  NOT NULL,
    activo boolean  NOT NULL,
    fecha_creacion date  NOT NULL,
    cargo int  NOT NULL,
    CONSTRAINT usuarios_pk PRIMARY KEY (id_usuario)
);

-- foreign keys
-- Reference: FK_0 (table: materiales)
ALTER TABLE materiales ADD CONSTRAINT FK_0
    FOREIGN KEY (id_categoria)
    REFERENCES categorias (id_categoria)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_1 (table: materiales)
ALTER TABLE materiales ADD CONSTRAINT FK_1
    FOREIGN KEY (id_unidad)
    REFERENCES unidades_medida (id_unidad)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_10 (table: entradas_inventario)
ALTER TABLE entradas_inventario ADD CONSTRAINT FK_10
    FOREIGN KEY (id_orden_compra)
    REFERENCES ordenes_compra (id_orden_compra)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_11 (table: entradas_inventario)
ALTER TABLE entradas_inventario ADD CONSTRAINT FK_11
    FOREIGN KEY (id_empleado_recibe)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_12 (table: detalle_entrada)
ALTER TABLE detalle_entrada ADD CONSTRAINT FK_12
    FOREIGN KEY (id_entrada)
    REFERENCES entradas_inventario (id_entrada)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_13 (table: detalle_entrada)
ALTER TABLE detalle_entrada ADD CONSTRAINT FK_13
    FOREIGN KEY (id_material)
    REFERENCES materiales (id_material)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_14 (table: salidas_inventario)
ALTER TABLE salidas_inventario ADD CONSTRAINT FK_14
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_15 (table: salidas_inventario)
ALTER TABLE salidas_inventario ADD CONSTRAINT FK_15
    FOREIGN KEY (id_proyecto)
    REFERENCES proyectos (id_proyecto)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_16 (table: salidas_inventario)
ALTER TABLE salidas_inventario ADD CONSTRAINT FK_16
    FOREIGN KEY (id_empleado_autoriza)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_17 (table: salidas_inventario)
ALTER TABLE salidas_inventario ADD CONSTRAINT FK_17
    FOREIGN KEY (id_empleado_retira)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_18 (table: detalle_salida)
ALTER TABLE detalle_salida ADD CONSTRAINT FK_18
    FOREIGN KEY (id_salida)
    REFERENCES salidas_inventario (id_salida)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_19 (table: detalle_salida)
ALTER TABLE detalle_salida ADD CONSTRAINT FK_19
    FOREIGN KEY (id_material)
    REFERENCES materiales (id_material)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_2 (table: stock_almacen)
ALTER TABLE stock_almacen ADD CONSTRAINT FK_2
    FOREIGN KEY (id_material)
    REFERENCES materiales (id_material)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_20 (table: transferencias)
ALTER TABLE transferencias ADD CONSTRAINT FK_20
    FOREIGN KEY (id_almacen_origen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_21 (table: transferencias)
ALTER TABLE transferencias ADD CONSTRAINT FK_21
    FOREIGN KEY (id_almacen_destino)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_22 (table: transferencias)
ALTER TABLE transferencias ADD CONSTRAINT FK_22
    FOREIGN KEY (id_empleado_autoriza)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_23 (table: detalle_transferencia)
ALTER TABLE detalle_transferencia ADD CONSTRAINT FK_23
    FOREIGN KEY (id_transferencia)
    REFERENCES transferencias (id_transferencia)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_24 (table: detalle_transferencia)
ALTER TABLE detalle_transferencia ADD CONSTRAINT FK_24
    FOREIGN KEY (id_material)
    REFERENCES materiales (id_material)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_25 (table: historial_movimientos)
ALTER TABLE historial_movimientos ADD CONSTRAINT FK_25
    FOREIGN KEY (id_material)
    REFERENCES materiales (id_material)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_26 (table: historial_movimientos)
ALTER TABLE historial_movimientos ADD CONSTRAINT FK_26
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_27 (table: historial_movimientos)
ALTER TABLE historial_movimientos ADD CONSTRAINT FK_27
    FOREIGN KEY (id_empleado)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_3 (table: stock_almacen)
ALTER TABLE stock_almacen ADD CONSTRAINT FK_3
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_4 (table: ordenes_compra)
ALTER TABLE ordenes_compra ADD CONSTRAINT FK_4
    FOREIGN KEY (id_proveedor)
    REFERENCES proveedores (id_proveedor)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_5 (table: ordenes_compra)
ALTER TABLE ordenes_compra ADD CONSTRAINT FK_5
    FOREIGN KEY (id_proyecto)
    REFERENCES proyectos (id_proyecto)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_6 (table: ordenes_compra)
ALTER TABLE ordenes_compra ADD CONSTRAINT FK_6
    FOREIGN KEY (id_empleado_solicita)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_7 (table: detalle_orden_compra)
ALTER TABLE detalle_orden_compra ADD CONSTRAINT FK_7
    FOREIGN KEY (id_orden_compra)
    REFERENCES ordenes_compra (id_orden_compra)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_8 (table: detalle_orden_compra)
ALTER TABLE detalle_orden_compra ADD CONSTRAINT FK_8
    FOREIGN KEY (id_material)
    REFERENCES materiales (id_material)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: FK_9 (table: entradas_inventario)
ALTER TABLE entradas_inventario ADD CONSTRAINT FK_9
    FOREIGN KEY (id_almacen)
    REFERENCES almacenes (id_almacen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: almacenes_empleados (table: almacenes)
ALTER TABLE almacenes ADD CONSTRAINT almacenes_empleados
    FOREIGN KEY (responsable)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: empleados_cargo (table: empleados)
ALTER TABLE empleados ADD CONSTRAINT empleados_cargo
    FOREIGN KEY (cargo)
    REFERENCES cargo (id_cargo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: empleados_usuarios (table: empleados)
ALTER TABLE empleados ADD CONSTRAINT empleados_usuarios
    FOREIGN KEY (id_usuario)
    REFERENCES usuarios (id_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ordenes_compra_estados (table: ordenes_compra)
ALTER TABLE ordenes_compra ADD CONSTRAINT ordenes_compra_estados
    FOREIGN KEY (estado)
    REFERENCES estados (id_estado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: proyectos_empleados (table: proyectos)
ALTER TABLE proyectos ADD CONSTRAINT proyectos_empleados
    FOREIGN KEY (responsable)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: proyectos_estados (table: proyectos)
ALTER TABLE proyectos ADD CONSTRAINT proyectos_estados
    FOREIGN KEY (estado)
    REFERENCES estados (id_estado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: transferencias_empleados (table: transferencias)
ALTER TABLE transferencias ADD CONSTRAINT transferencias_empleados
    FOREIGN KEY (id_empleado_solicitante)
    REFERENCES empleados (id_empleado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: transferencias_estados (table: transferencias)
ALTER TABLE transferencias ADD CONSTRAINT transferencias_estados
    FOREIGN KEY (estado)
    REFERENCES estados (id_estado)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: usuarios_cargo (table: usuarios)
ALTER TABLE usuarios ADD CONSTRAINT usuarios_cargo
    FOREIGN KEY (cargo)
    REFERENCES cargo (id_cargo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

