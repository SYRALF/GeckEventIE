export enum RolEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  ORGANIZADOR = 'organizador',
  PARTICIPANTE = 'participante',
}

export enum RolEventoEnum {
  PARTICIPANTE = 'participante',
  ASISTENTE = 'asistente',
  PONENTE = 'ponente',
}

export enum TipoCertificadoEnum {
  ASISTENCIA = 'asistencia',
  PONENTE = 'ponente',
}

export enum EstadoEventoEnum {
  BORRADOR = 'borrador',
  PUBLICADO = 'publicado',
  EN_CURSO = 'en_curso',
  FINALIZADO = 'finalizado',
  CANCELADO = 'cancelado',
}

export enum EstadoInscripcionEnum {
  PENDIENTE = 'pendiente',
  CONFIRMADA = 'confirmada',
  CANCELADA = 'cancelada',
}

export enum OrigenEnum {
  QR = 'qr',
  MANUAL = 'manual',
}