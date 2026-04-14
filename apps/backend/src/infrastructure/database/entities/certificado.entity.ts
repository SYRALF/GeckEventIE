import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { TipoCertificadoEnum } from './enums';
import { Inscripcion } from './inscripcion.entity';

@Entity('certificados')
export class Certificado {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'inscripcion_id' })
  inscripcionId!: string;

  @OneToOne(() => Inscripcion, (i) => i.certificado)
  @JoinColumn({ name: 'inscripcion_id' })
  inscripcion!: Inscripcion;

  @Column({ type: 'enum', enum: TipoCertificadoEnum })
  tipo!: TipoCertificadoEnum;

  @Column({ type: 'varchar', length: 500, name: 'nombre_archivo' })
  nombreArchivo!: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'codigo_verificacion' })
  codigoVerificacion!: string;

  @Column({ type: 'timestamptz', name: 'fecha_generacion' })
  fechaGeneracion!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}