import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './entities/usuario.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'usuarios',
        schema: UsuarioSchema,
      },
    ]),
  ],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
