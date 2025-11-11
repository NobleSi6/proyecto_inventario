import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('entradas_inventario')
export class EntradaInventario {
  @PrimaryGeneratedColumn()
  id_entrada: number;

  @Column()
  numero_entrada: string;

  @Column()
  id_almacen: number;

  @Column()
  id_orden_compra: number;

  @Column()
  id_empleado_recibe: number;

  @Column({ type: 'date' })
  fecha_entrada: Date;

  @Column({ nullable: true })
  tipo_entrada: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ type: 'timestamp', nullable: true })
  fecha_creacion: Date;

  @Column()
  activo: boolean;
}
