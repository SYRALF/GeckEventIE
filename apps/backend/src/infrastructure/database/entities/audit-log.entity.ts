import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'usuario_id', nullable: true })
  usuarioId!: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @Column({ type: 'varchar', length: 100 })
  accion!: string;

  @Column({ type: 'varchar', length: 100 })
  entidad!: string;

  @Column({ name: 'institucion_id', nullable: true })
  institucionId!: string;

  @Column({ type: 'jsonb', nullable: true })
  detalle!: object;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}