--
-- PostgreSQL database dump
--



-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

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
-- Name: items_inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items_inventario (
    id integer NOT NULL,
    sku character varying(50) NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    estado character varying(50) DEFAULT 'NUEVO'::character varying NOT NULL,
    "unidadMedida" character varying(50) NOT NULL,
    "stockActual" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "costoUnitario" numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "ubicacionInterna" character varying(150)
);


ALTER TABLE public.items_inventario OWNER TO postgres;

--
-- Name: items_inventario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_inventario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_inventario_id_seq OWNER TO postgres;

--
-- Name: items_inventario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_inventario_id_seq OWNED BY public.items_inventario.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    apellido character varying(100),
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    rol character varying(50) DEFAULT 'BODEGUERO'::character varying NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: items_inventario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_inventario ALTER COLUMN id SET DEFAULT nextval('public.items_inventario_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: items_inventario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items_inventario (id, sku, nombre, descripcion, estado, "unidadMedida", "stockActual", "costoUnitario", "ubicacionInterna") FROM stdin;
1	MAT-ACERO-005	Varilla de Acero 1/2 pulgada	Varilla corrugada de 12 metros de largo.	NUEVO	unidad	500.00	5.85	Bodega Central - Estante A5
2	MAT-A5	Varil pulgada	Varilla  de largo.	NUEVO	unidad	500.00	5.85	Bodega nte A5
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, apellido, email, password_hash, rol, activo, fecha_creacion) FROM stdin;
1	Sofia	López	sofia.lopez@constructora.com	$2b$10$YFX3/3h7x68DTus0YT1UcemO02r5C6kpDfiw9OEkAwhq.ePnOsoLG	SUPERVISOR	t	2025-10-06 14:09:09.741459
\.


--
-- Name: items_inventario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_inventario_id_seq', 2, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);


--
-- Name: usuarios UQ_446adfc18b35418aac32ae0b7b5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE (email);


--
-- Name: items_inventario UQ_44d301a2597bd7b0e15f38253df; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_inventario
    ADD CONSTRAINT "UQ_44d301a2597bd7b0e15f38253df" UNIQUE (sku);


--
-- Name: items_inventario items_inventario_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_inventario
    ADD CONSTRAINT items_inventario_pk PRIMARY KEY (id);


--
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--



