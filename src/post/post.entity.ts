import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MarkerColor } from './marker-color.enum';
import { ColumlnNumericTransformer } from 'src/@common/transformer/numeric.transformer';

export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    transformer: new ColumlnNumericTransformer(),
  })
  latitude: number;

  @Column({
    type: 'decimal',
    transformer: new ColumlnNumericTransformer(),
  })
  longtitude: number;

  @Column()
  color: MarkerColor;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'time with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column()
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
