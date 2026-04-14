import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { OrigenEnum } from './enums';
import { Evento } from './evento.entity';
import { Usuario } from './usuario.entity';

@Entity('asistencias')
export class Asistencia {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'inscripcion_id' })
  inscripcionId!: string;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @Column({ type: 'enum', enum: OrigenEnum })
  origen!: OrigenEnum;

  @Column({ type: 'timestamptz', name: 'fecha_marcado' })
  fechaMarcado!: Date;

  @Column({ name: 'marcado_por', nullable: true })
  marcadoPorId!: string;

  @ManyToOne(() => Usuario, (u) => u.asistenciasMarcadas)
  @JoinColumn({ name: 'marcado_por' })
  marcadoPor!: Usuario;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}