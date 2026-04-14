import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, ManyToMany,
} from 'typeorm';
import { Institucion } from './institucion.entity';
import { Evento } from './evento.entity';

@Entity('autoridades')
export class Autoridad {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  nombre!: string;

  @Column({ type: 'varchar', length: 150 })
  cargo!: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'firma_url' })
  firmaUrl!: string;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({ name: 'institucion_id' })
  institucionId!: string;

  @ManyToOne(() => Institucion, (i) => i.autoridades)
  @JoinColumn({ name: 'institucion_id' })
  institucion!: Institucion;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @ManyToMany(() => Evento, (e) => e.autoridades)
  eventos!: Evento[];
}