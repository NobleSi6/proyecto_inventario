-- #############################################
-- 1. LIMPIEZA DE DATOS (OPCIONAL)
-- * Truncar las tablas en orden inverso para evitar conflictos de FK.
-- * Se recomienda usar esta sección solo si la BD está vacía y quieres reiniciar.
-- #############################################
/*
TRUNCATE TABLE
    detalle_transferencia,
    transferencias,
    detalle_salida,
    salidas_inventario,
    detalle_entrada,
    entradas_inventario,
    detalle_orden_compra,
    ordenes_compra,
    historial_movimientos,
    stock_almacen,
    proyectos,
    almacenes,
    materiales,
    empleados,
    usuarios,
    proveedores,
    categorias,
    unidades_medida,
    estados,
    cargo
    RESTART IDENTITY CASCADE; -- IMPORTANTE: Reinicia las secuencias (serial IDs)
*/

-- #############################################
-- 2. INSERCIÓN DE DATOS MAESTROS (SIN DEPENDENCIAS)
-- #############################################

-- CARGO
INSERT INTO public.cargo (id_cargo, tipo_cargo, fecha_creacion, activo) VALUES
(1, 'Administrador', CURRENT_DATE, TRUE),
(2, 'Gerente de Almacén', CURRENT_DATE, TRUE),
(3, 'Almacenero', CURRENT_DATE, TRUE),
(4, 'Comprador', CURRENT_DATE, TRUE);
SELECT setval('public.cargo_id_cargo_seq', 4, true);

-- ESTADOS (Para Órdenes de Compra, Salidas, Transferencias, Proyectos)
INSERT INTO public.estados (id_estado, tipo_estado, activo) VALUES
(1, 'Pendiente', TRUE),
(2, 'Aprobado', TRUE),
(3, 'Rechazado', TRUE),
(4, 'En Proceso', TRUE),
(5, 'Completado', TRUE);
SELECT setval('public.estados_id_estado_seq', 5, true);

-- UNIDADES DE MEDIDA
INSERT INTO public.unidades_medida (id_unidad, nombre, abreviatura, activo) VALUES
(1, 'Unidad', 'UND', TRUE),
(2, 'Kilogramo', 'KG', TRUE),
(3, 'Litro', 'LT', TRUE),
(4, 'Caja', 'CAJ', TRUE);
SELECT setval('public.unidades_medida_id_unidad_seq', 4, true);

-- CATEGORÍAS
INSERT INTO public.categorias (id_categoria, nombre, descripcion, activo) VALUES
(1, 'Herramientas', 'Herramientas manuales y eléctricas', TRUE),
(2, 'Electrónica', 'Componentes electrónicos y sensores', TRUE),
(3, 'Consumibles', 'Material de oficina y limpieza', TRUE);
SELECT setval('public.categorias_id_categoria_seq', 3, true);

-- PROVEEDORES
INSERT INTO public.proveedores (id_proveedor, nombre_empresa, nit, contacto_nombre, activo) VALUES
(1, 'Tech Solutions SRL', '12345678021', 'Ana Morales', TRUE),
(2, 'Suministros Global S.A.', '98765432021', 'Marcos Roca', TRUE);
SELECT setval('public.proveedores_id_proveedor_seq', 2, true);

-- #############################################
-- 3. INSERCIÓN DE DATOS BASE (CON DEPENDENCIAS)
-- #############################################

-- USUARIOS (Depende de: cargo)
-- Corregido: removido 'rol', usando 'cargo' como FK.
INSERT INTO public.usuarios (id_usuario, username, password, activo, fecha_creacion, cargo) VALUES
(1, 'admin.juan', '123456', TRUE, CURRENT_DATE, 1), -- Administrador (id_cargo=1)
(2, 'almacen.maria', '123456', TRUE, CURRENT_DATE, 3), -- Almacenero (id_cargo=3)
(3, 'comprador.carlos', '123456', TRUE, CURRENT_DATE, 4); -- Comprador (id_cargo=4)
SELECT setval('public.usuarios_id_usuario_seq', 3, true);

-- EMPLEADOS (Depende de: cargo, usuarios)
INSERT INTO public.empleados (id_empleado, codigo, nombres, ap_paterno, ap_materno, cargo, id_usuario, activo) VALUES
(1, 'EMP001', 'Juan', 'Perez', 'Gomez', 1, 1, TRUE), -- Administrador, Usuario 1
(2, 'EMP002', 'Maria', 'Lopez', 'Roca', 3, 2, TRUE), -- Almacenero, Usuario 2
(3, 'EMP003', 'Carlos', 'Vaca', 'Suarez', 4, 3, TRUE); -- Comprador, Usuario 3
SELECT setval('public.empleados_id_empleado_seq', 3, true);

-- ALMACENES (Depende de: empleados)
INSERT INTO public.almacenes (id_almacen, nombre, codigo, responsable, capacidad_m3, activo) VALUES
(1, 'Almacén Central', 'ALM-CEN', 2, 5000.00, TRUE), -- Responsable: Maria Lopez (id_empleado=2)
(2, 'Almacén Sucursal Sur', 'ALM-SUR', 1, 1500.00, TRUE); -- Responsable: Juan Perez (id_empleado=1)
SELECT setval('public.almacenes_id_almacen_seq', 2, true);

-- PROYECTOS (Depende de: estados, empleados)
INSERT INTO public.proyectos (id_proyecto, codigo, nombre, estado, responsable, activo) VALUES
(1, 'PROY-A', 'Proyecto de Expansión La Paz', 2, 1, TRUE), -- Aprobado (id_estado=2), Responsable: Juan Perez (id_empleado=1)
(2, 'PROY-B', 'Implementación de ERP', 1, 2, TRUE); -- Pendiente (id_estado=1), Responsable: Maria Lopez (id_empleado=2)
SELECT setval('public.proyectos_id_proyecto_seq', 2, true);

-- MATERIALES (Depende de: categorias, unidades_medida)
-- Corregido: usando 'codigo' y 'precio_unitario'.
INSERT INTO public.materiales (id_material, codigo, nombre, id_categoria, id_unidad, stock_minimo, precio_unitario, activo) VALUES
(1, 'MAT001', 'Tornillo M8 x 50mm', 1, 1, 100, 0.50, TRUE),
(2, 'MAT002', 'Sensor de Temperatura PT100', 2, 1, 10, 50.00, TRUE),
(3, 'MAT003', 'Resma Papel Oficio', 3, 4, 5, 45.00, TRUE);
SELECT setval('public.materiales_id_material_seq', 3, true);

-- #############################################
-- 4. INSERCIÓN DE DATOS TRANSACCIONALES
-- #############################################

-- STOCK DE ALMACÉN (Stock inicial para los almacenes) (Depende de: materiales, almacenes)
INSERT INTO public.stock_almacen (id_stock, id_material, id_almacen, cantidad_disponible, activo) VALUES
(1, 1, 1, 1000.00, TRUE), -- MAT001 en Almacén Central: 1000
(2, 2, 1, 2.00, TRUE),    -- MAT002 en Almacén Central: 2
(3, 3, 2, 10.00, TRUE);   -- MAT003 en Almacén Sur: 10
SELECT setval('public.stock_almacen_id_stock_seq', 3, true);

-- ÓRDENES DE COMPRA (Depende de: proveedores, empleados, estados)
-- Corregido: usando 'id_empleado_solicita'.
INSERT INTO public.ordenes_compra (id_orden_compra, numero_orden, id_proveedor, id_empleado_solicita, estado, fecha_orden, subtotal, impuestos, total, activo) VALUES
(1, 'OC-2025-001', 1, 3, 2, CURRENT_DATE, 480.00, 20.00, 500.00, TRUE); -- Aprobada (id_estado=2), Solicitante: Carlos (id_empleado=3)
SELECT setval('public.ordenes_compra_id_orden_compra_seq', 1, true);

-- DETALLE ORDEN DE COMPRA (Depende de: ordenes_compra, materiales)
INSERT INTO public.detalle_orden_compra (id_detalle, id_orden_compra, id_material, cantidad, precio_unitario, subtotal, activo) VALUES
(1, 1, 1, 1000.00, 0.40, 400.00, TRUE),
(2, 1, 2, 2.00, 40.00, 80.00, TRUE);
SELECT setval('public.detalle_orden_compra_id_detalle_seq', 2, true);

-- ENTRADAS DE INVENTARIO (Depende de: almacenes, ordenes_compra, empleados)
INSERT INTO public.entradas_inventario (id_entrada, numero_entrada, id_almacen, id_orden_compra, id_empleado_recibe, observaciones) VALUES
(1, 'ENT-2025-001', 1, 1, 2, 'Entrada de la Orden de Compra OC-2025-001'); -- Recibe: Maria (id_empleado=2)
SELECT setval('public.entradas_inventario_id_entrada_seq', 1, true);

-- DETALLE ENTRADA (Depende de: entradas_inventario, materiales)
INSERT INTO public.detalle_entrada (id_detalle_entrada, id_entrada, id_material, cantidad, precio_unitario, activo) VALUES
(1, 1, 1, 1000.00, 0.40, TRUE),
(2, 1, 2, 2.00, 40.00, TRUE);
SELECT setval('public.detalle_entrada_id_detalle_entrada_seq', 2, true);

-- SALIDA DE INVENTARIO (Depende de: almacenes, proyectos, empleados)
-- Corregido: usando 'id_empleado_autoriza' e 'id_empleado_retira', sin 'estado'.
INSERT INTO public.salidas_inventario (id_salida, numero_salida, id_almacen, id_proyecto, id_empleado_autoriza, id_empleado_retira, activo) VALUES
(1, 'SAL-2025-001', 1, 1, 1, 2, TRUE); -- Autoriza: Juan (id_empleado=1), Retira: Maria (id_empleado=2)
SELECT setval('public.salidas_inventario_id_salida_seq', 1, true);

-- DETALLE SALIDA (Depende de: salidas_inventario, materiales)
INSERT INTO public.detalle_salida (id_detalle_salida, id_salida, id_material, cantidad, activo) VALUES
(1, 1, 1, 50.00, TRUE); -- Se retiran 50 tornillos
SELECT setval('public.detalle_salida_id_detalle_salida_seq', 1, true);

-- TRANSFERENCIA DE INVENTARIO (Depende de: almacenes, empleados, estados)
-- Corregido: usando 'id_almacen_origen' e 'id_almacen_destino'.
INSERT INTO public.transferencias (id_transferencia, numero_transferencia, id_almacen_origen, id_almacen_destino, id_empleado_solicitante, estado, activo) VALUES
(1, 'TRANS-2025-001', 1, 2, 2, 4, TRUE); -- Origen: Central (1), Destino: Sur (2), Solicitante: Maria (2), Estado: En Proceso (4)
SELECT setval('public.transferencias_id_transferencia_seq', 1, true);

-- DETALLE TRANSFERENCIA (Depende de: transferencias, materiales)
INSERT INTO public.detalle_transferencia (id_detalle_transferencia, id_transferencia, id_material, cantidad, activo) VALUES
(1, 1, 3, 5.00, TRUE); -- Material MAT003 (Resma Papel Oficio)
SELECT setval('public.detalle_transferencia_id_detalle_transferencia_seq', 1, true);

-- HISTORIAL DE MOVIMIENTOS (Depende de: materiales, almacenes, empleados)
INSERT INTO public.historial_movimientos (id_movimiento, id_material, id_almacen, tipo_movimiento, cantidad, stock_anterior, stock_nuevo, id_empleado, activo) VALUES
(1, 1, 1, 'ENTRADA', 1000.00, 0.00, 1000.00, 2, TRUE), -- Entrada MAT001 en Almacén 1
(2, 1, 1, 'SALIDA', 50.00, 1000.00, 950.00, 1, TRUE), -- Salida MAT001 en Almacén 1
(3, 3, 1, 'TRANSFERENCIA_OUT', 5.00, 0.00, -5.00, 2, TRUE); -- Salida por Transferencia de MAT003 del Almacén 1 (asumiendo que era 0 inicialmente en el stock, o se usa el stock actual para la resta)
SELECT setval('public.historial_movimientos_id_movimiento_seq', 3, true);