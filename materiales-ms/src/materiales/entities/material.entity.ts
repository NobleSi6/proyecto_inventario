import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('materiales')
export class Material {

  @PrimaryGeneratedColumn({ name: 'id_material' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  codigo: string;

  @Column({ type: 'varchar', length: 150 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'id_categoria', type: 'int', nullable: true })
  idCategoria: number;

  @Column({ name: 'id_unidad', type: 'int', nullable: true })
  idUnidad: number;

  @Column({ name: 'precio_unitario', type: 'numeric', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ name: 'stock_minimo', type: 'int', default: 0 })
  stockMinimo: number;

  @Column({ name: 'stock_maximo', type: 'int', default: 0 })
  stockMaximo: number;

  @Column({ name: 'ubicacion_almacen', type: 'varchar', length: 200, nullable: true })
  ubicacionAlmacen: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;

}
