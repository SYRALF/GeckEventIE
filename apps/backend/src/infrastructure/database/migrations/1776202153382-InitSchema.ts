import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1776202153382 implements MigrationInterface {
    name = 'InitSchema1776202153382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categorias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(100) NOT NULL, "descripcion" text, "institucion_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3886a26251605c571c6b4f861fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carreras" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(150) NOT NULL, "facultad" character varying(150), "institucion_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dbd386086d7ac1cf75d546efdd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plantillas_certificado" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(150) NOT NULL, "imagen_fondo_url" character varying(500), "activo" boolean NOT NULL DEFAULT true, "institucion_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6202b48f01ef17066ea9e00e49e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "autoridades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(150) NOT NULL, "cargo" character varying(150) NOT NULL, "firma_url" character varying(500), "activo" boolean NOT NULL DEFAULT true, "institucion_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_faad04ca6dab878445ac2f6d218" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."eventos_estado_enum" AS ENUM('borrador', 'publicado', 'en_curso', 'finalizado', 'cancelado')`);
        await queryRunner.query(`CREATE TABLE "eventos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "titulo" character varying(200) NOT NULL, "descripcion" text, "fecha_inicio" TIMESTAMP WITH TIME ZONE NOT NULL, "fecha_fin" TIMESTAMP WITH TIME ZONE NOT NULL, "ubicacion" character varying(300), "cupo_maximo" integer NOT NULL, "estado" "public"."eventos_estado_enum" NOT NULL DEFAULT 'borrador', "imagen_url" character varying(500), "horas_duracion" integer, "qr_token" character varying, "qr_activo" boolean NOT NULL DEFAULT false, "genera_certificado" boolean NOT NULL DEFAULT false, "texto_certificado" text, "institucion_id" uuid NOT NULL, "organizador_id" uuid, "categoria_id" uuid, "carrera_id" uuid, "plantilla_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9db819e1675f910acb065a970a2" UNIQUE ("qr_token"), CONSTRAINT "PK_40d4a3c6a4bfd24280cb97a509e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."certificados_tipo_enum" AS ENUM('asistencia', 'ponente')`);
        await queryRunner.query(`CREATE TABLE "certificados" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "inscripcion_id" uuid NOT NULL, "tipo" "public"."certificados_tipo_enum" NOT NULL, "nombre_archivo" character varying(500) NOT NULL, "codigo_verificacion" character varying(100) NOT NULL, "fecha_generacion" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_45f4fabfaee995231aeab99cc44" UNIQUE ("codigo_verificacion"), CONSTRAINT "REL_23587f49c9b7c00b9a25b5ca30" UNIQUE ("inscripcion_id"), CONSTRAINT "PK_e9b232ca7a16db08667f021708f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."inscripciones_rol_evento_enum" AS ENUM('participante', 'asistente', 'ponente')`);
        await queryRunner.query(`CREATE TYPE "public"."inscripciones_estado_enum" AS ENUM('pendiente', 'confirmada', 'cancelada')`);
        await queryRunner.query(`CREATE TABLE "inscripciones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "evento_id" uuid NOT NULL, "participante_id" uuid NOT NULL, "rol_evento" "public"."inscripciones_rol_evento_enum" NOT NULL DEFAULT 'participante', "certificado_generado" boolean NOT NULL DEFAULT false, "fecha_inscripcion" TIMESTAMP WITH TIME ZONE, "estado" "public"."inscripciones_estado_enum" NOT NULL DEFAULT 'pendiente', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_17a12f6ab342f6762d81e940d19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."asistencias_origen_enum" AS ENUM('qr', 'manual')`);
        await queryRunner.query(`CREATE TABLE "asistencias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "inscripcion_id" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "origen" "public"."asistencias_origen_enum" NOT NULL, "fecha_marcado" TIMESTAMP WITH TIME ZONE NOT NULL, "marcado_por" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f7eb09d44d6c7dd4ccc6eb29af8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_rol_enum" AS ENUM('super_admin', 'admin', 'organizador', 'participante')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cedula" character varying(20) NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "rol" "public"."usuarios_rol_enum" NOT NULL DEFAULT 'participante', "activo" boolean NOT NULL DEFAULT true, "institucion_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d0a04a74cdb68388fa196a5ba51" UNIQUE ("cedula"), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instituciones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(200) NOT NULL, "slug" character varying(100) NOT NULL, "dominio_email" character varying(100) NOT NULL, "logo_url" character varying(300), "color_primario" character varying(7), "direccion" character varying(300), "sitio_web" character varying(300), "activo" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_26432f4088d2b4315c773421200" UNIQUE ("slug"), CONSTRAINT "UQ_231a4c49c434a5c41dad747dddc" UNIQUE ("dominio_email"), CONSTRAINT "PK_4be89b4d1536e4588a73f2247d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audit_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuario_id" uuid, "accion" character varying(100) NOT NULL, "entidad" character varying(100) NOT NULL, "institucion_id" character varying, "detalle" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evento_autoridades" ("evento_id" uuid NOT NULL, "autoridad_id" uuid NOT NULL, CONSTRAINT "PK_ba1707901c291f0a3a85865bd22" PRIMARY KEY ("evento_id", "autoridad_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cce8168341e037cab6a8337b53" ON "evento_autoridades" ("evento_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a52be0d3581243eb3a94e3365" ON "evento_autoridades" ("autoridad_id") `);
        await queryRunner.query(`ALTER TABLE "categorias" ADD CONSTRAINT "FK_506a0f91b5a28d6b2169acf995c" FOREIGN KEY ("institucion_id") REFERENCES "instituciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carreras" ADD CONSTRAINT "FK_f3b69d152d2971d67cce341457d" FOREIGN KEY ("institucion_id") REFERENCES "instituciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plantillas_certificado" ADD CONSTRAINT "FK_f1af316cd2e039351a581465bb6" FOREIGN KEY ("institucion_id") REFERENCES "instituciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "autoridades" ADD CONSTRAINT "FK_9586088087092a61b1fc199795d" FOREIGN KEY ("institucion_id") REFERENCES "instituciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_d5bfa94b1ac62f88d13bf4fc194" FOREIGN KEY ("institucion_id") REFERENCES "instituciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_a059ed7b743dbae58ac866f128d" FOREIGN KEY ("organizador_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_09bd5bf293a9c4ad730dc9cd61f" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_674cd3926b502f026d2b198e012" FOREIGN KEY ("carrera_id") REFERENCES "carreras"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "eventos" ADD CONSTRAINT "FK_07a40f5e571d9874086524fcfaf" FOREIGN KEY ("plantilla_id") REFERENCES "plantillas_certificado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "certificados" ADD CONSTRAINT "FK_23587f49c9b7c00b9a25b5ca305" FOREIGN KEY ("inscripcion_id") REFERENCES "inscripciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inscripciones" ADD CONSTRAINT "FK_6a0cc44f5825c4d13555340043b" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inscripciones" ADD CONSTRAINT "FK_c245fcd3ddcc34aee7e54604c40" FOREIGN KEY ("participante_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "asistencias" ADD CONSTRAINT "FK_5675d06af96a0a7ec5963040823" FOREIGN KEY ("marcado_por") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_38dcba13a9fe5b43e50ea013803" FOREIGN KEY ("institucion_id") REFERENCES "instituciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_76adac46b6075b2a28f1a7d1008" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evento_autoridades" ADD CONSTRAINT "FK_cce8168341e037cab6a8337b53b" FOREIGN KEY ("evento_id") REFERENCES "eventos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "evento_autoridades" ADD CONSTRAINT "FK_0a52be0d3581243eb3a94e3365a" FOREIGN KEY ("autoridad_id") REFERENCES "autoridades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "evento_autoridades" DROP CONSTRAINT "FK_0a52be0d3581243eb3a94e3365a"`);
        await queryRunner.query(`ALTER TABLE "evento_autoridades" DROP CONSTRAINT "FK_cce8168341e037cab6a8337b53b"`);
        await queryRunner.query(`ALTER TABLE "audit_logs" DROP CONSTRAINT "FK_76adac46b6075b2a28f1a7d1008"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_38dcba13a9fe5b43e50ea013803"`);
        await queryRunner.query(`ALTER TABLE "asistencias" DROP CONSTRAINT "FK_5675d06af96a0a7ec5963040823"`);
        await queryRunner.query(`ALTER TABLE "inscripciones" DROP CONSTRAINT "FK_c245fcd3ddcc34aee7e54604c40"`);
        await queryRunner.query(`ALTER TABLE "inscripciones" DROP CONSTRAINT "FK_6a0cc44f5825c4d13555340043b"`);
        await queryRunner.query(`ALTER TABLE "certificados" DROP CONSTRAINT "FK_23587f49c9b7c00b9a25b5ca305"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_07a40f5e571d9874086524fcfaf"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_674cd3926b502f026d2b198e012"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_09bd5bf293a9c4ad730dc9cd61f"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_a059ed7b743dbae58ac866f128d"`);
        await queryRunner.query(`ALTER TABLE "eventos" DROP CONSTRAINT "FK_d5bfa94b1ac62f88d13bf4fc194"`);
        await queryRunner.query(`ALTER TABLE "autoridades" DROP CONSTRAINT "FK_9586088087092a61b1fc199795d"`);
        await queryRunner.query(`ALTER TABLE "plantillas_certificado" DROP CONSTRAINT "FK_f1af316cd2e039351a581465bb6"`);
        await queryRunner.query(`ALTER TABLE "carreras" DROP CONSTRAINT "FK_f3b69d152d2971d67cce341457d"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP CONSTRAINT "FK_506a0f91b5a28d6b2169acf995c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a52be0d3581243eb3a94e3365"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cce8168341e037cab6a8337b53"`);
        await queryRunner.query(`DROP TABLE "evento_autoridades"`);
        await queryRunner.query(`DROP TABLE "audit_logs"`);
        await queryRunner.query(`DROP TABLE "instituciones"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_rol_enum"`);
        await queryRunner.query(`DROP TABLE "asistencias"`);
        await queryRunner.query(`DROP TYPE "public"."asistencias_origen_enum"`);
        await queryRunner.query(`DROP TABLE "inscripciones"`);
        await queryRunner.query(`DROP TYPE "public"."inscripciones_estado_enum"`);
        await queryRunner.query(`DROP TYPE "public"."inscripciones_rol_evento_enum"`);
        await queryRunner.query(`DROP TABLE "certificados"`);
        await queryRunner.query(`DROP TYPE "public"."certificados_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "eventos"`);
        await queryRunner.query(`DROP TYPE "public"."eventos_estado_enum"`);
        await queryRunner.query(`DROP TABLE "autoridades"`);
        await queryRunner.query(`DROP TABLE "plantillas_certificado"`);
        await queryRunner.query(`DROP TABLE "carreras"`);
        await queryRunner.query(`DROP TABLE "categorias"`);
    }

}
