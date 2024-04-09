import { Injectable } from '@nestjs/common';
import { Usuario } from './entities/usuario.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel('usuarios')
    private readonly usuarioModel: Model<Usuario>,
  ) {}

  async buscar(login: string, password: string): Promise<Usuario | undefined> {
    return this.usuarioModel.findOne(
      (u) => u.login === login && u.password === password,
    );
  }
}
