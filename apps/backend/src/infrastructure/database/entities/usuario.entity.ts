import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { RolEnum } from './enums';
import { Institucion } from './institucion.entity';
import { Inscripcion } from './inscripcion.entity';
import { Asistencia } from './asistencia.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  cedula!: string;

  @Column({ type: 'varchar', length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 100 })
  apellido!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'enum', enum: RolEnum, default: RolEnum.PARTICIPANTE })
  rol!: RolEnum;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({ name: 'institucion_id' })
  institucionId!: string;

  @ManyToOne(() => Institucion, (i) => i.usuarios)
  @JoinColumn({ name: 'institucion_id' })
  institucion!: Institucion;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Inscripcion, (i) => i.participante)
  inscripciones!: Inscripcion[];

  @OneToMany(() => Asistencia, (a) => a.marcadoPor)
  asistenciasMarcadas!: Asistencia[];
}