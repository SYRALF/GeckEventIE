import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Institucion } from './institucion.entity';
import { Evento } from './evento.entity';

@Entity('carreras')
export class Carrera {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  nombre!: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  facultad!: string;

  @Column({ name: 'institucion_id' })
  institucionId!: string;

  @ManyToOne(() => Institucion, (i) => i.carreras)
  @JoinColumn({ name: 'institucion_id' })
  institucion!: Institucion;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Evento, (e) => e.carrera)
  eventos!: Evento[];
}