import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  productName: string;

  @Column()
  quantityUsed: number;

  @Column()
  projectId: number;

  @Column({ type: 'timestamp' })
  usageDate: Date;
}
