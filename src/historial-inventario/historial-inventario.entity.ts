import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Almacen } from '../almacenes/almacen.entity'; // Asume que esta es la entidad de Almacenes
import { ItemInventario } from '../inventario/item-inventario.entity'; // Asume que esta es la entidad de Inventario

@Entity('historial_inventario') // Nombre de la tabla en la base de datos
export class HistorialInventario {
  @PrimaryGeneratedColumn()
  id: number;

  // -------------------------------------------------------------------
  // CLAVES FORÁNEAS Y RELACIONES
  // -------------------------------------------------------------------

  // Relación con el Ítem de Inventario (el material afectado)
  @Column({ name: 'inventario_id' })
  inventarioId: number; 

  @ManyToOne(() => ItemInventario)
  @JoinColumn({ name: 'inventario_id' })
  item: ItemInventario;

  // Relación con el Almacén donde ocurrió el movimiento
  @Column({ name: 'almacen_id' })
  almacenId: number;

  @ManyToOne(() => Almacen)
  @JoinColumn({ name: 'almacen_id' })
  almacen: Almacen;

  // -------------------------------------------------------------------
  // DETALLES DEL MOVIMIENTO
  // -------------------------------------------------------------------

  // Tipo de movimiento (ENTRADA, SALIDA, AJUSTE, etc.)
  @Column({ type: 'varchar', length: 20 })
  tipoMovimiento: string;

  // Cantidad que se movió (positiva para ENTRADA, negativa o positiva para AJUSTE)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  // Stock resultante después del movimiento
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  stockResultante: number; 

  // Referencia del documento o transacción que generó el movimiento
  @Column({ type: 'varchar', length: 100 })
  referencia: string; 

  // Observaciones o motivo del movimiento
  @Column({ type: 'text', nullable: true })
  observaciones: string;


  // Fecha y hora de creación del registro
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  // Columna para registrar el usuario que realizó el movimiento
  // NOTA: Esto requiere un sistema de autenticación como JWT
  @Column({ type: 'varchar', length: 50, nullable: true })
  usuarioResponsable: string;
}