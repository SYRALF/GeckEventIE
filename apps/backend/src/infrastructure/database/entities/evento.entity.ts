import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, JoinColumn, OneToMany,
  ManyToMany, JoinTable,
} from 'typeorm';
import { EstadoEventoEnum } from './enums';
import { Institucion } from './institucion.entity';
import { Categoria } from './categoria.entity';
import { Carrera } from './carrera.entity';
import { PlantillaCertificado } from './plantilla-certificado.entity';
import { Autoridad } from './autoridad.entity';
import { Inscripcion } from './inscripcion.entity';
import { Usuario } from './usuario.entity';

@Entity('eventos')
export class Evento {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  titulo!: string;

  @Column({ type: 'text', nullable: true })
  descripcion!: string;

  @Column({ type: 'timestamptz', name: 'fecha_inicio' })
  fechaInicio!: Date;

  @Column({ type: 'timestamptz', name: 'fecha_fin' })
  fechaFin!: Date;

  @Column({ type: 'varchar', length: 300, nullable: true })
  ubicacion!: string;

  @Column({ type: 'integer' })
  cupo_maximo!: number;

  @Column({
    type: 'enum',
    enum: EstadoEventoEnum,
    default: EstadoEventoEnum.BORRADOR,
  })
  estado!: EstadoEventoEnum;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'imagen_url' })
  imagenUrl!: string;

  @Column({ type: 'integer', nullable: true, name: 'horas_duracion' })
  horasDuracion!: number;

  @Column({ type: 'varchar', nullable: true, name: 'qr_token', unique: true })
  qrToken!: string;

  @Column({ type: 'boolean', default: false, name: 'qr_activo' })
  qrActivo!: boolean;

  @Column({ type: 'boolean', default: false, name: 'genera_certificado' })
  generaCertificado!: boolean;

  @Column({ type: 'text', nullable: true, name: 'texto_certificado' })
  textoCertificado!: string;

  @Column({ name: 'institucion_id' })
  institucionId!: string;

  @ManyToOne(() => Institucion, (i) => i.eventos)
  @JoinColumn({ name: 'institucion_id' })
  institucion!: Institucion;

  @Column({ nullable: true, name: 'organizador_id' })
  organizadorId!: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'organizador_id' })
  organizador!: Usuario;

  @Column({ nullable: true, name: 'categoria_id' })
  categoriaId!: string;

  @ManyToOne(() => Categoria, (c) => c.eventos)
  @JoinColumn({ name: 'categoria_id' })
  categoria!: Categoria;

  @Column({ nullable: true, name: 'carrera_id' })
  carreraId!: string;

  @ManyToOne(() => Carrera, (c) => c.eventos)
  @JoinColumn({ name: 'carrera_id' })
  carrera!: Carrera;

  @Column({ nullable: true, name: 'plantilla_id' })
  plantillaId!: string;

  @ManyToOne(() => PlantillaCertificado, (p) => p.eventos)
  @JoinColumn({ name: 'plantilla_id' })
  plantilla!: PlantillaCertificado;

  @ManyToMany(() => Autoridad, (a) => a.eventos)
  @JoinTable({
    name: 'evento_autoridades',
    joinColumn: { name: 'evento_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'autoridad_id', referencedColumnName: 'id' },
  })
  autoridades!: Autoridad[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Inscripcion, (i) => i.evento)
  inscripciones!: Inscripcion[];
}