import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Institucion } from './institucion.entity';
import { Evento } from './evento.entity';

@Entity('plantillas_certificado')
export class PlantillaCertificado {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  nombre!: string;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'imagen_fondo_url' })
  imagenFondoUrl!: string;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({ name: 'institucion_id' })
  institucionId!: string;

  @ManyToOne(() => Institucion, (i) => i.plantillas)
  @JoinColumn({ name: 'institucion_id' })
  institucion!: Institucion;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Evento, (e) => e.plantilla)
  eventos!: Evento[];
}