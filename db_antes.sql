-- Created by Redgate Data Modeler (https://datamodeler.redgate-platform.com)
-- Last modification date: 2025-10-14 18:16:07.836

-- tables
-- Table: Rol
CREATE TABLE Rol (
    id_rol serial  NOT NULL,
    Cargo varchar(100)  NOT NULL,
    CONSTRAINT Rol_pk PRIMARY KEY (id_rol)
);

-- Table: almacenes
CREATE TABLE almacenes (
    almacen_id int  NOT NULL,
    nombre_almacen varchar(100)  NULL,
    direccion text  NOT NULL,
    capacidad_total decimal(10,2)  NOT NULL,
    activo boolean  NULL DEFAULT true,
    fecha_creacion timestamp  NOT NULL DEFAULT current_timestamp,
    item_id int  NOT NULL,
    CONSTRAINT Almacenes_pk PRIMARY KEY (almacen_id)
);

-- Table: categorias
CREATE TABLE categorias (
    categoria_id int  NOT NULL,
    nombre_categoria varchar(100)  NOT NULL,
    descripcion text  NULL,
    CONSTRAINT Categorias_pk PRIMARY KEY (categoria_id)
);

-- Table: historial_Inventario
CREATE TABLE historial_Inventario (
    id_historial_inventario int  NOT NULL,
    fecha date  NOT NULL,
    item_id int  NOT NULL,
    almacen_id int  NOT NULL,
    id_salida int  NOT NULL,
    CONSTRAINT Historial_Inventario_pk PRIMARY KEY (id_historial_inventario)
);

-- Table: historial_logins
CREATE TABLE historial_logins (
    id_historial_logins serial  NOT NULL,
    fecha_login timestamp  NULL DEFAULT current_timestamp,
    usuario_id int  NOT NULL,
    CONSTRAINT Historial_Logins_pk PRIMARY KEY (id_historial_logins)
);

-- Table: item_Inventarios
CREATE TABLE item_Inventarios (
    item_id int  NOT NULL,
    nombre_item varchar(200)  NOT NULL,
    descripcion text  NULL,
    unidad_medida varchar(50)  NOT NULL,
    stock_minimo int  NULL DEFAULT 0,
    activo boolean  NULL DEFAULT true,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    usuario_id int  NOT NULL,
    categoria_id int  NOT NULL,
    CONSTRAINT Item_Inventarios_pk PRIMARY KEY (item_id)
);

-- Table: item_inventario_proveedores
CREATE TABLE item_inventario_proveedores (
    id_item_inventario_proveedores serial  NOT NULL,
    cantidad int  NOT NULL,
    id_proveedores int  NOT NULL,
    item_id int  NOT NULL,
    CONSTRAINT item_inventario_proveedores_pk PRIMARY KEY (id_item_inventario_proveedores,id_proveedores,item_id)
);

-- Table: proveedores
CREATE TABLE proveedores (
    id_proveedores serial  NOT NULL,
    nombre varchar(100)  NOT NULL,
    nit varchar(20)  NOT NULL,
    direccion text  NULL,
    telefono_empresa varchar(20)  NULL,
    email varchar(100)  NULL,
    CONSTRAINT CHECK_2 CHECK (( estado IN ( 'ACTIVO' , 'INACTIVO' ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT proveedores_pk PRIMARY KEY (id_proveedores)
);

-- Table: salidas_inventario
CREATE TABLE salidas_inventario (
    id_salida serial  NOT NULL,
    fecha_salida timestamp  NOT NULL DEFAULT current_timestamp,
    entregado_por integer  NULL,
    recibido_por varchar(100)  NULL,
    observaciones text  NULL,
    cantidad int  NOT NULL,
    destino varchar(255)  NOT NULL,
    id_solicitudes_retiro int  NOT NULL,
    CONSTRAINT salidas_inventario_pk PRIMARY KEY (id_salida)
);

-- Table: solicitudes_retiro
CREATE TABLE solicitudes_retiro (
    id_solicitudes_retiro serial  NOT NULL,
    fecha_solicitud timestamp  NULL DEFAULT current_timestamp,
    fecha_requerida date  NULL,
    motivo text  NULL,
    aprobado_por integer  NULL,
    usuario_id int  NOT NULL,
    CONSTRAINT CHECK_8 CHECK (( estado IN ( 'PENDIENTE' , 'APROBADA' , 'RECHAZADA' , 'ENTREGADA_PARCIAL' , 'ENTREGADA_TOTAL' ) )) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT solicitudes_retiro_pk PRIMARY KEY (id_solicitudes_retiro)
);

-- Table: usuarios
CREATE TABLE usuarios (
    usuario_id int  NOT NULL,
    nombre varchar(100)  NOT NULL,
    password_hash varchar(255)  NOT NULL,
    telefono varchar(20)  NULL,
    email varchar(150)  NOT NULL,
    activo boolean  NULL DEFAULT true,
    fecha_creacion timestamp  NULL DEFAULT current_timestamp,
    id_rol int  NOT NULL,
    CONSTRAINT Usuarios_pk PRIMARY KEY (usuario_id)
);

-- foreign keys
-- Reference: Copy_of_Item_Inventarios_Copy_of_Usuarios (table: item_Inventarios)
ALTER TABLE item_Inventarios ADD CONSTRAINT Copy_of_Item_Inventarios_Copy_of_Usuarios
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: almacenes_item_Inventarios (table: almacenes)
ALTER TABLE almacenes ADD CONSTRAINT almacenes_item_Inventarios
    FOREIGN KEY (item_id)
    REFERENCES item_Inventarios (item_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: historial_Inventario_almacenes (table: historial_Inventario)
ALTER TABLE historial_Inventario ADD CONSTRAINT historial_Inventario_almacenes
    FOREIGN KEY (almacen_id)
    REFERENCES almacenes (almacen_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: historial_Inventario_item_Inventarios (table: historial_Inventario)
ALTER TABLE historial_Inventario ADD CONSTRAINT historial_Inventario_item_Inventarios
    FOREIGN KEY (item_id)
    REFERENCES item_Inventarios (item_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: historial_Inventario_salidas_inventario (table: historial_Inventario)
ALTER TABLE historial_Inventario ADD CONSTRAINT historial_Inventario_salidas_inventario
    FOREIGN KEY (id_salida)
    REFERENCES salidas_inventario (id_salida)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: historial_logins_usuarios (table: historial_logins)
ALTER TABLE historial_logins ADD CONSTRAINT historial_logins_usuarios
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: item_Inventarios_categorias (table: item_Inventarios)
ALTER TABLE item_Inventarios ADD CONSTRAINT item_Inventarios_categorias
    FOREIGN KEY (categoria_id)
    REFERENCES categorias (categoria_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: item_inventario_proveedores_item_Inventarios (table: item_inventario_proveedores)
ALTER TABLE item_inventario_proveedores ADD CONSTRAINT item_inventario_proveedores_item_Inventarios
    FOREIGN KEY (item_id)
    REFERENCES item_Inventarios (item_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: item_inventario_proveedores_proveedores (table: item_inventario_proveedores)
ALTER TABLE item_inventario_proveedores ADD CONSTRAINT item_inventario_proveedores_proveedores
    FOREIGN KEY (id_proveedores)
    REFERENCES proveedores (id_proveedores)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: salidas_inventario_solicitudes_retiro (table: salidas_inventario)
ALTER TABLE salidas_inventario ADD CONSTRAINT salidas_inventario_solicitudes_retiro
    FOREIGN KEY (id_solicitudes_retiro)
    REFERENCES solicitudes_retiro (id_solicitudes_retiro)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: solicitudes_retiro_usuarios (table: solicitudes_retiro)
ALTER TABLE solicitudes_retiro ADD CONSTRAINT solicitudes_retiro_usuarios
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: usuarios_Rol (table: usuarios)
ALTER TABLE usuarios ADD CONSTRAINT usuarios_Rol
    FOREIGN KEY (id_rol)
    REFERENCES Rol (id_rol)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

