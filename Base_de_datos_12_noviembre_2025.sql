--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: almacenes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.almacenes (
    id_almacen integer NOT NULL,
    nombre character varying(150) NOT NULL,
    codigo character varying(50),
    direccion text,
    ciudad character varying(100),
    telefono character varying(20),
    capacidad_m3 numeric(10,2),
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    responsable integer NOT NULL
);


ALTER TABLE public.almacenes OWNER TO postgres;

--
-- Name: almacenes_id_almacen_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.almacenes_id_almacen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.almacenes_id_almacen_seq OWNER TO postgres;

--
-- Name: almacenes_id_almacen_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.almacenes_id_almacen_seq OWNED BY public.almacenes.id_almacen;


--
-- Name: cargo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cargo (
    id_cargo integer NOT NULL,
    tipo_cargo character varying(100) NOT NULL,
    fecha_creacion date NOT NULL,
    activo boolean NOT NULL
);


ALTER TABLE public.cargo OWNER TO postgres;

--
-- Name: cargo_id_cargo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cargo_id_cargo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cargo_id_cargo_seq OWNER TO postgres;

--
-- Name: cargo_id_cargo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cargo_id_cargo_seq OWNED BY public.cargo.id_cargo;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_id_categoria_seq OWNER TO postgres;

--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;


--
-- Name: detalle_entrada; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_entrada (
    id_detalle_entrada integer NOT NULL,
    id_entrada integer,
    id_material integer,
    cantidad numeric(12,2) NOT NULL,
    precio_unitario numeric(12,2),
    lote character varying(50),
    fecha_vencimiento date,
    observaciones text,
    activo boolean NOT NULL
);


ALTER TABLE public.detalle_entrada OWNER TO postgres;

--
-- Name: detalle_entrada_id_detalle_entrada_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_entrada_id_detalle_entrada_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_entrada_id_detalle_entrada_seq OWNER TO postgres;

--
-- Name: detalle_entrada_id_detalle_entrada_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_entrada_id_detalle_entrada_seq OWNED BY public.detalle_entrada.id_detalle_entrada;


--
-- Name: detalle_orden_compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_orden_compra (
    id_detalle integer NOT NULL,
    id_orden_compra integer,
    id_material integer,
    cantidad numeric(12,2) NOT NULL,
    precio_unitario numeric(12,2) NOT NULL,
    subtotal numeric(12,2) NOT NULL,
    observaciones text,
    activo boolean NOT NULL
);


ALTER TABLE public.detalle_orden_compra OWNER TO postgres;

--
-- Name: detalle_orden_compra_id_detalle_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_orden_compra_id_detalle_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_orden_compra_id_detalle_seq OWNER TO postgres;

--
-- Name: detalle_orden_compra_id_detalle_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_orden_compra_id_detalle_seq OWNED BY public.detalle_orden_compra.id_detalle;


--
-- Name: detalle_salida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_salida (
    id_detalle_salida integer NOT NULL,
    id_salida integer,
    id_material integer,
    cantidad numeric(12,2) NOT NULL,
    observaciones text,
    activo boolean NOT NULL
);


ALTER TABLE public.detalle_salida OWNER TO postgres;

--
-- Name: detalle_salida_id_detalle_salida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_salida_id_detalle_salida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_salida_id_detalle_salida_seq OWNER TO postgres;

--
-- Name: detalle_salida_id_detalle_salida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_salida_id_detalle_salida_seq OWNED BY public.detalle_salida.id_detalle_salida;


--
-- Name: detalle_transferencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.detalle_transferencia (
    id_detalle_transferencia integer NOT NULL,
    id_transferencia integer,
    id_material integer,
    cantidad numeric(12,2) NOT NULL,
    cantidad_recibida numeric(12,2),
    observaciones text,
    activo boolean NOT NULL
);


ALTER TABLE public.detalle_transferencia OWNER TO postgres;

--
-- Name: detalle_transferencia_id_detalle_transferencia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.detalle_transferencia_id_detalle_transferencia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.detalle_transferencia_id_detalle_transferencia_seq OWNER TO postgres;

--
-- Name: detalle_transferencia_id_detalle_transferencia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.detalle_transferencia_id_detalle_transferencia_seq OWNED BY public.detalle_transferencia.id_detalle_transferencia;


--
-- Name: empleados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleados (
    id_empleado integer NOT NULL,
    codigo character varying(50),
    nombres character varying(100) NOT NULL,
    ap_paterno character varying(100) NOT NULL,
    ap_materno character varying(100),
    ci character varying(20),
    cargo integer NOT NULL,
    telefono character varying(20),
    email character varying(100),
    fecha_contratacion date,
    activo boolean DEFAULT true,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    id_usuario integer NOT NULL
);


ALTER TABLE public.empleados OWNER TO postgres;

--
-- Name: empleados_id_empleado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleados_id_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleados_id_empleado_seq OWNER TO postgres;

--
-- Name: empleados_id_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleados_id_empleado_seq OWNED BY public.empleados.id_empleado;


--
-- Name: entradas_inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.entradas_inventario (
    id_entrada integer NOT NULL,
    numero_entrada character varying(50) NOT NULL,
    id_almacen integer,
    id_orden_compra integer,
    id_empleado_recibe integer,
    fecha_entrada date DEFAULT CURRENT_DATE NOT NULL,
    tipo_entrada character varying(50) DEFAULT 'compra'::character varying,
    observaciones text,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.entradas_inventario OWNER TO postgres;

--
-- Name: entradas_inventario_id_entrada_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.entradas_inventario_id_entrada_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.entradas_inventario_id_entrada_seq OWNER TO postgres;

--
-- Name: entradas_inventario_id_entrada_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.entradas_inventario_id_entrada_seq OWNED BY public.entradas_inventario.id_entrada;


--
-- Name: estados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados (
    id_estado integer NOT NULL,
    tipo_estado character varying(50) NOT NULL,
    activo boolean NOT NULL
);


ALTER TABLE public.estados OWNER TO postgres;

--
-- Name: estados_id_estado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.estados_id_estado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.estados_id_estado_seq OWNER TO postgres;

--
-- Name: estados_id_estado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.estados_id_estado_seq OWNED BY public.estados.id_estado;


--
-- Name: historial_movimientos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historial_movimientos (
    id_movimiento integer NOT NULL,
    id_material integer,
    id_almacen integer,
    tipo_movimiento character varying(50) NOT NULL,
    cantidad numeric(12,2) NOT NULL,
    stock_anterior numeric(12,2),
    stock_nuevo numeric(12,2),
    referencia character varying(100),
    id_empleado integer,
    fecha_movimiento timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    observaciones text,
    activo boolean NOT NULL
);


ALTER TABLE public.historial_movimientos OWNER TO postgres;

--
-- Name: historial_movimientos_id_movimiento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historial_movimientos_id_movimiento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_movimientos_id_movimiento_seq OWNER TO postgres;

--
-- Name: historial_movimientos_id_movimiento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historial_movimientos_id_movimiento_seq OWNED BY public.historial_movimientos.id_movimiento;


--
-- Name: materiales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.materiales (
    id_material integer NOT NULL,
    codigo character varying(50) NOT NULL,
    nombre character varying(200) NOT NULL,
    descripcion text,
    id_categoria integer,
    id_unidad integer,
    precio_unitario numeric(12,2),
    stock_minimo integer DEFAULT 0,
    stock_maximo integer,
    ubicacion_almacen character varying(100),
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.materiales OWNER TO postgres;

--
-- Name: materiales_id_material_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.materiales_id_material_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.materiales_id_material_seq OWNER TO postgres;

--
-- Name: materiales_id_material_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.materiales_id_material_seq OWNED BY public.materiales.id_material;


--
-- Name: ordenes_compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ordenes_compra (
    id_orden_compra integer NOT NULL,
    numero_orden character varying(50) NOT NULL,
    id_proveedor integer,
    id_proyecto integer,
    id_empleado_solicita integer,
    fecha_orden date DEFAULT CURRENT_DATE NOT NULL,
    fecha_entrega_estimada date,
    fecha_entrega_real date,
    subtotal numeric(12,2),
    impuestos numeric(12,2),
    total numeric(12,2),
    observaciones text,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado integer NOT NULL,
    activo boolean NOT NULL
);


ALTER TABLE public.ordenes_compra OWNER TO postgres;

--
-- Name: ordenes_compra_id_orden_compra_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ordenes_compra_id_orden_compra_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ordenes_compra_id_orden_compra_seq OWNER TO postgres;

--
-- Name: ordenes_compra_id_orden_compra_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ordenes_compra_id_orden_compra_seq OWNED BY public.ordenes_compra.id_orden_compra;


--
-- Name: proveedores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proveedores (
    id_proveedor integer NOT NULL,
    nombre_empresa character varying(200) NOT NULL,
    nit character varying(20),
    telefono character varying(20),
    email character varying(100),
    direccion text,
    ciudad character varying(100),
    pais character varying(100) DEFAULT 'bolivia'::character varying,
    contacto_nombre character varying(150),
    contacto_telefono character varying(20),
    activo boolean DEFAULT true,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.proveedores OWNER TO postgres;

--
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proveedores_id_proveedor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proveedores_id_proveedor_seq OWNER TO postgres;

--
-- Name: proveedores_id_proveedor_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proveedores_id_proveedor_seq OWNED BY public.proveedores.id_proveedor;


--
-- Name: proyectos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proyectos (
    id_proyecto integer NOT NULL,
    codigo character varying(50) NOT NULL,
    nombre character varying(200) NOT NULL,
    descripcion text,
    direccion text,
    ciudad character varying(100),
    fecha_inicio date,
    fecha_fin_estimada date,
    fecha_fin_real date,
    presupuesto numeric(15,2),
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    responsable integer NOT NULL,
    estado integer NOT NULL
);


ALTER TABLE public.proyectos OWNER TO postgres;

--
-- Name: proyectos_id_proyecto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proyectos_id_proyecto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_id_proyecto_seq OWNER TO postgres;

--
-- Name: proyectos_id_proyecto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proyectos_id_proyecto_seq OWNED BY public.proyectos.id_proyecto;


--
-- Name: salidas_inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.salidas_inventario (
    id_salida integer NOT NULL,
    numero_salida character varying(50) NOT NULL,
    id_almacen integer,
    id_proyecto integer,
    id_empleado_autoriza integer,
    id_empleado_retira integer,
    fecha_salida date DEFAULT CURRENT_DATE NOT NULL,
    tipo_salida character varying(50) DEFAULT 'uso en proyecto'::character varying,
    observaciones text,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    activo boolean NOT NULL
);


ALTER TABLE public.salidas_inventario OWNER TO postgres;

--
-- Name: salidas_inventario_id_salida_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.salidas_inventario_id_salida_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.salidas_inventario_id_salida_seq OWNER TO postgres;

--
-- Name: salidas_inventario_id_salida_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.salidas_inventario_id_salida_seq OWNED BY public.salidas_inventario.id_salida;


--
-- Name: stock_almacen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stock_almacen (
    id_stock integer NOT NULL,
    id_material integer,
    id_almacen integer,
    cantidad_disponible numeric(12,2) DEFAULT 0,
    cantidad_reservada numeric(12,2) DEFAULT 0,
    ultima_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    activo boolean NOT NULL
);


ALTER TABLE public.stock_almacen OWNER TO postgres;

--
-- Name: stock_almacen_id_stock_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.stock_almacen_id_stock_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stock_almacen_id_stock_seq OWNER TO postgres;

--
-- Name: stock_almacen_id_stock_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.stock_almacen_id_stock_seq OWNED BY public.stock_almacen.id_stock;


--
-- Name: transferencias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transferencias (
    id_transferencia integer NOT NULL,
    numero_transferencia character varying(50) NOT NULL,
    id_almacen_origen integer,
    id_almacen_destino integer,
    id_empleado_autoriza integer,
    fecha_transferencia date DEFAULT CURRENT_DATE NOT NULL,
    fecha_recepcion date,
    observaciones text,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    estado integer NOT NULL,
    id_empleado_solicitante integer NOT NULL,
    activo boolean NOT NULL
);


ALTER TABLE public.transferencias OWNER TO postgres;

--
-- Name: transferencias_id_transferencia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transferencias_id_transferencia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transferencias_id_transferencia_seq OWNER TO postgres;

--
-- Name: transferencias_id_transferencia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transferencias_id_transferencia_seq OWNED BY public.transferencias.id_transferencia;


--
-- Name: unidades_medida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unidades_medida (
    id_unidad integer NOT NULL,
    nombre character varying(50) NOT NULL,
    abreviatura character varying(10) NOT NULL,
    tipo character varying(50),
    activo boolean NOT NULL
);


ALTER TABLE public.unidades_medida OWNER TO postgres;

--
-- Name: unidades_medida_id_unidad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.unidades_medida_id_unidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.unidades_medida_id_unidad_seq OWNER TO postgres;

--
-- Name: unidades_medida_id_unidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.unidades_medida_id_unidad_seq OWNED BY public.unidades_medida.id_unidad;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(200) NOT NULL,
    activo boolean NOT NULL,
    fecha_creacion date NOT NULL,
    cargo integer NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: almacenes id_almacen; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almacenes ALTER COLUMN id_almacen SET DEFAULT nextval('public.almacenes_id_almacen_seq'::regclass);


--
-- Name: cargo id_cargo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargo ALTER COLUMN id_cargo SET DEFAULT nextval('public.cargo_id_cargo_seq'::regclass);


--
-- Name: categorias id_categoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);


--
-- Name: detalle_entrada id_detalle_entrada; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_entrada ALTER COLUMN id_detalle_entrada SET DEFAULT nextval('public.detalle_entrada_id_detalle_entrada_seq'::regclass);


--
-- Name: detalle_orden_compra id_detalle; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden_compra ALTER COLUMN id_detalle SET DEFAULT nextval('public.detalle_orden_compra_id_detalle_seq'::regclass);


--
-- Name: detalle_salida id_detalle_salida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida ALTER COLUMN id_detalle_salida SET DEFAULT nextval('public.detalle_salida_id_detalle_salida_seq'::regclass);


--
-- Name: detalle_transferencia id_detalle_transferencia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_transferencia ALTER COLUMN id_detalle_transferencia SET DEFAULT nextval('public.detalle_transferencia_id_detalle_transferencia_seq'::regclass);


--
-- Name: empleados id_empleado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleados_id_empleado_seq'::regclass);


--
-- Name: entradas_inventario id_entrada; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entradas_inventario ALTER COLUMN id_entrada SET DEFAULT nextval('public.entradas_inventario_id_entrada_seq'::regclass);


--
-- Name: estados id_estado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados ALTER COLUMN id_estado SET DEFAULT nextval('public.estados_id_estado_seq'::regclass);


--
-- Name: historial_movimientos id_movimiento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos ALTER COLUMN id_movimiento SET DEFAULT nextval('public.historial_movimientos_id_movimiento_seq'::regclass);


--
-- Name: materiales id_material; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materiales ALTER COLUMN id_material SET DEFAULT nextval('public.materiales_id_material_seq'::regclass);


--
-- Name: ordenes_compra id_orden_compra; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra ALTER COLUMN id_orden_compra SET DEFAULT nextval('public.ordenes_compra_id_orden_compra_seq'::regclass);


--
-- Name: proveedores id_proveedor; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores ALTER COLUMN id_proveedor SET DEFAULT nextval('public.proveedores_id_proveedor_seq'::regclass);


--
-- Name: proyectos id_proyecto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos ALTER COLUMN id_proyecto SET DEFAULT nextval('public.proyectos_id_proyecto_seq'::regclass);


--
-- Name: salidas_inventario id_salida; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas_inventario ALTER COLUMN id_salida SET DEFAULT nextval('public.salidas_inventario_id_salida_seq'::regclass);


--
-- Name: stock_almacen id_stock; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_almacen ALTER COLUMN id_stock SET DEFAULT nextval('public.stock_almacen_id_stock_seq'::regclass);


--
-- Name: transferencias id_transferencia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transferencias ALTER COLUMN id_transferencia SET DEFAULT nextval('public.transferencias_id_transferencia_seq'::regclass);


--
-- Name: unidades_medida id_unidad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades_medida ALTER COLUMN id_unidad SET DEFAULT nextval('public.unidades_medida_id_unidad_seq'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Name: categorias ak_0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT ak_0 UNIQUE (nombre);


--
-- Name: proveedores ak_1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT ak_1 UNIQUE (nit);


--
-- Name: ordenes_compra ak_10; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra
    ADD CONSTRAINT ak_10 UNIQUE (numero_orden);


--
-- Name: entradas_inventario ak_11; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entradas_inventario
    ADD CONSTRAINT ak_11 UNIQUE (numero_entrada);


--
-- Name: salidas_inventario ak_12; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas_inventario
    ADD CONSTRAINT ak_12 UNIQUE (numero_salida);


--
-- Name: transferencias ak_13; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT ak_13 UNIQUE (numero_transferencia);


--
-- Name: unidades_medida ak_2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades_medida
    ADD CONSTRAINT ak_2 UNIQUE (nombre);


--
-- Name: unidades_medida ak_3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades_medida
    ADD CONSTRAINT ak_3 UNIQUE (abreviatura);


--
-- Name: materiales ak_4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materiales
    ADD CONSTRAINT ak_4 UNIQUE (codigo);


--
-- Name: almacenes ak_5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almacenes
    ADD CONSTRAINT ak_5 UNIQUE (codigo);


--
-- Name: stock_almacen ak_6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_almacen
    ADD CONSTRAINT ak_6 UNIQUE (id_material, id_almacen);


--
-- Name: proyectos ak_7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT ak_7 UNIQUE (codigo);


--
-- Name: empleados ak_8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT ak_8 UNIQUE (codigo);


--
-- Name: empleados ak_9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT ak_9 UNIQUE (ci);


--
-- Name: almacenes almacenes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almacenes
    ADD CONSTRAINT almacenes_pk PRIMARY KEY (id_almacen);


--
-- Name: cargo cargo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cargo
    ADD CONSTRAINT cargo_pk PRIMARY KEY (id_cargo);


--
-- Name: categorias categorias_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pk PRIMARY KEY (id_categoria);


--
-- Name: detalle_entrada detalle_entrada_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_entrada
    ADD CONSTRAINT detalle_entrada_pk PRIMARY KEY (id_detalle_entrada);


--
-- Name: detalle_orden_compra detalle_orden_compra_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden_compra
    ADD CONSTRAINT detalle_orden_compra_pk PRIMARY KEY (id_detalle);


--
-- Name: detalle_salida detalle_salida_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida
    ADD CONSTRAINT detalle_salida_pk PRIMARY KEY (id_detalle_salida);


--
-- Name: detalle_transferencia detalle_transferencia_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_transferencia
    ADD CONSTRAINT detalle_transferencia_pk PRIMARY KEY (id_detalle_transferencia);


--
-- Name: empleados empleados_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pk PRIMARY KEY (id_empleado);


--
-- Name: entradas_inventario entradas_inventario_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entradas_inventario
    ADD CONSTRAINT entradas_inventario_pk PRIMARY KEY (id_entrada);


--
-- Name: estados estados_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_pk PRIMARY KEY (id_estado);


--
-- Name: historial_movimientos historial_movimientos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos
    ADD CONSTRAINT historial_movimientos_pk PRIMARY KEY (id_movimiento);


--
-- Name: materiales materiales_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materiales
    ADD CONSTRAINT materiales_pk PRIMARY KEY (id_material);


--
-- Name: ordenes_compra ordenes_compra_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra
    ADD CONSTRAINT ordenes_compra_pk PRIMARY KEY (id_orden_compra);


--
-- Name: proveedores proveedores_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pk PRIMARY KEY (id_proveedor);


--
-- Name: proyectos proyectos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pk PRIMARY KEY (id_proyecto);


--
-- Name: salidas_inventario salidas_inventario_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas_inventario
    ADD CONSTRAINT salidas_inventario_pk PRIMARY KEY (id_salida);


--
-- Name: stock_almacen stock_almacen_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_almacen
    ADD CONSTRAINT stock_almacen_pk PRIMARY KEY (id_stock);


--
-- Name: transferencias transferencias_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT transferencias_pk PRIMARY KEY (id_transferencia);


--
-- Name: unidades_medida unidades_medida_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades_medida
    ADD CONSTRAINT unidades_medida_pk PRIMARY KEY (id_unidad);


--
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id_usuario);


--
-- Name: idx_entradas_almacen; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_entradas_almacen ON public.entradas_inventario USING btree (id_almacen);


--
-- Name: idx_historial_fecha; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_historial_fecha ON public.historial_movimientos USING btree (fecha_movimiento);


--
-- Name: idx_historial_material; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_historial_material ON public.historial_movimientos USING btree (id_material);


--
-- Name: idx_materiales_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_materiales_categoria ON public.materiales USING btree (id_categoria);


--
-- Name: idx_materiales_codigo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_materiales_codigo ON public.materiales USING btree (codigo);


--
-- Name: idx_ordenes_proveedor; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ordenes_proveedor ON public.ordenes_compra USING btree (id_proveedor);


--
-- Name: idx_ordenes_proyecto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ordenes_proyecto ON public.ordenes_compra USING btree (id_proyecto);


--
-- Name: idx_salidas_almacen; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_salidas_almacen ON public.salidas_inventario USING btree (id_almacen);


--
-- Name: idx_salidas_proyecto; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_salidas_proyecto ON public.salidas_inventario USING btree (id_proyecto);


--
-- Name: idx_stock_almacen; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_stock_almacen ON public.stock_almacen USING btree (id_almacen);


--
-- Name: idx_stock_material; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_stock_material ON public.stock_almacen USING btree (id_material);


--
-- Name: almacenes almacenes_empleados; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.almacenes
    ADD CONSTRAINT almacenes_empleados FOREIGN KEY (responsable) REFERENCES public.empleados(id_empleado);


--
-- Name: empleados empleados_cargo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_cargo FOREIGN KEY (cargo) REFERENCES public.cargo(id_cargo);


--
-- Name: empleados empleados_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_usuarios FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: materiales fk_0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materiales
    ADD CONSTRAINT fk_0 FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria);


--
-- Name: materiales fk_1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.materiales
    ADD CONSTRAINT fk_1 FOREIGN KEY (id_unidad) REFERENCES public.unidades_medida(id_unidad);


--
-- Name: entradas_inventario fk_10; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entradas_inventario
    ADD CONSTRAINT fk_10 FOREIGN KEY (id_orden_compra) REFERENCES public.ordenes_compra(id_orden_compra);


--
-- Name: entradas_inventario fk_11; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entradas_inventario
    ADD CONSTRAINT fk_11 FOREIGN KEY (id_empleado_recibe) REFERENCES public.empleados(id_empleado);


--
-- Name: detalle_entrada fk_12; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_entrada
    ADD CONSTRAINT fk_12 FOREIGN KEY (id_entrada) REFERENCES public.entradas_inventario(id_entrada) ON DELETE CASCADE;


--
-- Name: detalle_entrada fk_13; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_entrada
    ADD CONSTRAINT fk_13 FOREIGN KEY (id_material) REFERENCES public.materiales(id_material);


--
-- Name: salidas_inventario fk_14; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas_inventario
    ADD CONSTRAINT fk_14 FOREIGN KEY (id_almacen) REFERENCES public.almacenes(id_almacen);


--
-- Name: salidas_inventario fk_15; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas_inventario
    ADD CONSTRAINT fk_15 FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


--
-- Name: salidas_inventario fk_16; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas_inventario
    ADD CONSTRAINT fk_16 FOREIGN KEY (id_empleado_autoriza) REFERENCES public.empleados(id_empleado);


--
-- Name: salidas_inventario fk_17; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.salidas_inventario
    ADD CONSTRAINT fk_17 FOREIGN KEY (id_empleado_retira) REFERENCES public.empleados(id_empleado);


--
-- Name: detalle_salida fk_18; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida
    ADD CONSTRAINT fk_18 FOREIGN KEY (id_salida) REFERENCES public.salidas_inventario(id_salida) ON DELETE CASCADE;


--
-- Name: detalle_salida fk_19; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_salida
    ADD CONSTRAINT fk_19 FOREIGN KEY (id_material) REFERENCES public.materiales(id_material);


--
-- Name: stock_almacen fk_2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_almacen
    ADD CONSTRAINT fk_2 FOREIGN KEY (id_material) REFERENCES public.materiales(id_material);


--
-- Name: transferencias fk_20; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT fk_20 FOREIGN KEY (id_almacen_origen) REFERENCES public.almacenes(id_almacen);


--
-- Name: transferencias fk_21; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT fk_21 FOREIGN KEY (id_almacen_destino) REFERENCES public.almacenes(id_almacen);


--
-- Name: transferencias fk_22; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT fk_22 FOREIGN KEY (id_empleado_autoriza) REFERENCES public.empleados(id_empleado);


--
-- Name: detalle_transferencia fk_23; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_transferencia
    ADD CONSTRAINT fk_23 FOREIGN KEY (id_transferencia) REFERENCES public.transferencias(id_transferencia) ON DELETE CASCADE;


--
-- Name: detalle_transferencia fk_24; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_transferencia
    ADD CONSTRAINT fk_24 FOREIGN KEY (id_material) REFERENCES public.materiales(id_material);


--
-- Name: historial_movimientos fk_25; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos
    ADD CONSTRAINT fk_25 FOREIGN KEY (id_material) REFERENCES public.materiales(id_material);


--
-- Name: historial_movimientos fk_26; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos
    ADD CONSTRAINT fk_26 FOREIGN KEY (id_almacen) REFERENCES public.almacenes(id_almacen);


--
-- Name: historial_movimientos fk_27; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historial_movimientos
    ADD CONSTRAINT fk_27 FOREIGN KEY (id_empleado) REFERENCES public.empleados(id_empleado);


--
-- Name: stock_almacen fk_3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stock_almacen
    ADD CONSTRAINT fk_3 FOREIGN KEY (id_almacen) REFERENCES public.almacenes(id_almacen);


--
-- Name: ordenes_compra fk_4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra
    ADD CONSTRAINT fk_4 FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id_proveedor);


--
-- Name: ordenes_compra fk_5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra
    ADD CONSTRAINT fk_5 FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


--
-- Name: ordenes_compra fk_6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra
    ADD CONSTRAINT fk_6 FOREIGN KEY (id_empleado_solicita) REFERENCES public.empleados(id_empleado);


--
-- Name: detalle_orden_compra fk_7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden_compra
    ADD CONSTRAINT fk_7 FOREIGN KEY (id_orden_compra) REFERENCES public.ordenes_compra(id_orden_compra) ON DELETE CASCADE;


--
-- Name: detalle_orden_compra fk_8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.detalle_orden_compra
    ADD CONSTRAINT fk_8 FOREIGN KEY (id_material) REFERENCES public.materiales(id_material);


--
-- Name: entradas_inventario fk_9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.entradas_inventario
    ADD CONSTRAINT fk_9 FOREIGN KEY (id_almacen) REFERENCES public.almacenes(id_almacen);


--
-- Name: ordenes_compra ordenes_compra_estados; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra
    ADD CONSTRAINT ordenes_compra_estados FOREIGN KEY (estado) REFERENCES public.estados(id_estado);


--
-- Name: proyectos proyectos_empleados; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_empleados FOREIGN KEY (responsable) REFERENCES public.empleados(id_empleado);


--
-- Name: proyectos proyectos_estados; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_estados FOREIGN KEY (estado) REFERENCES public.estados(id_estado);


--
-- Name: transferencias transferencias_empleados; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT transferencias_empleados FOREIGN KEY (id_empleado_solicitante) REFERENCES public.empleados(id_empleado);


--
-- Name: transferencias transferencias_estados; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transferencias
    ADD CONSTRAINT transferencias_estados FOREIGN KEY (estado) REFERENCES public.estados(id_estado);


--
-- Name: usuarios usuarios_cargo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cargo FOREIGN KEY (cargo) REFERENCES public.cargo(id_cargo);


--
-- PostgreSQL database dump complete
--

