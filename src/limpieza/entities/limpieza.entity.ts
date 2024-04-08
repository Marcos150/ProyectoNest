import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Limpieza extends Document {
  @Prop({
    required: true,
    default: Date.now,
  })
  fecha: Date;
  @Prop({
    ref: 'habitaciones',
  })
  habitacion: mongoose.Schema.Types.ObjectId;
  @Prop({
    trim: true,
    required: false,
  })
  observaciones: string;
}

export const LimpiezaSchema = SchemaFactory.createForClass(Limpieza);
