import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Categoria } from './categoria.entity';
import { Carrera } from './carrera.entity';
import { PlantillaCertificado } from './plantilla-certificado.entity';
import { Autoridad } from './autoridad.entity';
import { Evento } from './evento.entity';

@Entity('instituciones')
export class Institucion {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 200 })
  nombre!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug!: string;

  @Column({ type: 'varchar', length: 100, unique: true, name: 'dominio_email' })
  dominioEmail!: string;

  @Column({ type: 'varchar', length: 300, nullable: true, name: 'logo_url' })
  logoUrl!: string;

  @Column({ type: 'varchar', length: 7, nullable: true, name: 'color_primario' })
  colorPrimario!: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  direccion!: string;

  @Column({ type: 'varchar', length: 300, nullable: true, name: 'sitio_web' })
  sitioWeb!: string;

  @Column({ type: 'boolean', default: true })
  activo!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Usuario, (u) => u.institucion)
  usuarios!: Usuario[];

  @OneToMany(() => Categoria, (c) => c.institucion)
  categorias!: Categoria[];

  @OneToMany(() => Carrera, (c) => c.institucion)
  carreras!: Carrera[];

  @OneToMany(() => PlantillaCertificado, (p) => p.institucion)
  plantillas!: PlantillaCertificado[];

  @OneToMany(() => Autoridad, (a) => a.institucion)
  autoridades!: Autoridad[];

  @OneToMany(() => Evento, (e) => e.institucion)
  eventos!: Evento[];
}