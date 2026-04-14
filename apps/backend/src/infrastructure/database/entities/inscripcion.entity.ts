import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToOne,
} from 'typeorm';
import { RolEventoEnum, EstadoInscripcionEnum } from './enums';
import { Evento } from './evento.entity';
import { Usuario } from './usuario.entity';
import { Certificado } from './certificado.entity';

@Entity('inscripciones', {
  orderBy: { createdAt: 'DESC' },
})
export class Inscripcion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'evento_id' })
  eventoId!: string;

  @ManyToOne(() => Evento, (e) => e.inscripciones)
  @JoinColumn({ name: 'evento_id' })
  evento!: Evento;

  @Column({ name: 'participante_id' })
  participanteId!: string;

  @ManyToOne(() => Usuario, (u) => u.inscripciones)
  @JoinColumn({ name: 'participante_id' })
  participante!: Usuario;

  @Column({
    type: 'enum',
    enum: RolEventoEnum,
    name: 'rol_evento',
    default: RolEventoEnum.PARTICIPANTE,
  })
  rolEvento!: RolEventoEnum;

  @Column({ type: 'boolean', default: false, name: 'certificado_generado' })
  certificadoGenerado!: boolean;

  @Column({ type: 'timestamptz', nullable: true, name: 'fecha_inscripcion' })
  fechaInscripcion!: Date;

  @Column({
    type: 'enum',
    enum: EstadoInscripcionEnum,
    default: EstadoInscripcionEnum.PENDIENTE,
  })
  estado!: EstadoInscripcionEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToOne(() => Certificado, (c) => c.inscripcion)
  certificado!: Certificado;
}