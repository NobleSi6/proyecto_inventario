import { 
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn
} from 'typeorm';

@Entity('items_inventario')
export class ItemInventario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  sku: string; // Código de inventario

  @Column({ length: 255 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ length: 50 })
  unidadMedida: string; // 'metros', 'sacos', 'unidades'

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
  stockActual: number; // Columna 'cantidad'

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0.00 })
  costoUnitario: number;

  @Column({ length: 50, default: 'NUEVO' })
  estado: string; // 'NUEVO', 'USADO', 'DAÑADO'

  // Campo de texto simple para guardar la ubicación
  @Column({ length: 150, nullable: true })
  ubicacionInterna: string;
}