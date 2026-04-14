import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institucion } from './infrastructure/database/entities/institucion.entity';
import { Usuario } from './infrastructure/database/entities/usuario.entity';
import { Categoria } from './infrastructure/database/entities/categoria.entity';
import { Carrera } from './infrastructure/database/entities/carrera.entity';
import { PlantillaCertificado } from './infrastructure/database/entities/plantilla-certificado.entity';
import { Autoridad } from './infrastructure/database/entities/autoridad.entity';
import { Evento } from './infrastructure/database/entities/evento.entity';
import { Inscripcion } from './infrastructure/database/entities/inscripcion.entity';
import { Asistencia } from './infrastructure/database/entities/asistencia.entity';
import { Certificado } from './infrastructure/database/entities/certificado.entity';
import { AuditLog } from './infrastructure/database/entities/audit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [
          Institucion, Usuario, Categoria, Carrera,
          PlantillaCertificado, Autoridad, Evento,
          Inscripcion, Asistencia, Certificado, AuditLog,
        ],
        migrations: [__dirname + '/infrastructure/database/migrations/*{.ts,.js}'],
        synchronize: false, // NUNCA true en producción
        logging: true,
      }),
    }),
  ],
})
export class AppModule { }
