import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Institucion } from './entities/institucion.entity';
import { Usuario } from './entities/usuario.entity';
import { Categoria } from './entities/categoria.entity';
import { Carrera } from './entities/carrera.entity';
import { PlantillaCertificado } from './entities/plantilla-certificado.entity';
import { Autoridad } from './entities/autoridad.entity';
import { Evento } from './entities/evento.entity';
import { Inscripcion } from './entities/inscripcion.entity';
import { Asistencia } from './entities/asistencia.entity';
import { Certificado } from './entities/certificado.entity';
import { AuditLog } from './entities/audit-log.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Institucion, Usuario, Categoria, Carrera,
    PlantillaCertificado, Autoridad, Evento,
    Inscripcion, Asistencia, Certificado, AuditLog,
  ],
  migrations: ['src/infrastructure/database/migrations/*{.ts,.js}'],
  synchronize: false,
});