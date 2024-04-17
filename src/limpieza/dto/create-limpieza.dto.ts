import { IsDateString, IsEmpty, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';
export class CreateLimpiezaDto {
  @IsEmpty({ message: 'La fecha no puede estar vacía' })
  @IsDateString(
    {},
    { message: 'El formato de fecha es inadecuado (yyyy-mm-dd)' },
  )
  readonly fecha: Date;
  @IsMongoId({
    message:
      'El campo habitación debe corresponder a un id de la colección de "habitaciones" ya existente',
  })
  readonly habitacion: mongoose.Schema.Types.ObjectId;
  readonly observaciones: string;
}
