import { PartialType } from '@nestjs/mapped-types';
import { CreateLimpiezaDto } from './create-limpieza.dto';
import mongoose from 'mongoose';
import { IsMongoId } from 'class-validator';

export class UpdateLimpiezaDto extends PartialType(CreateLimpiezaDto) {
  @IsMongoId({
    message:
      'El campo habitación debe corresponder a un id de la colección de "habitaciones" ya existente',
  })
  habitacion: mongoose.Schema.Types.ObjectId;
}
