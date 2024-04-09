import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async login(login: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.buscar(login, password);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    // Queda pendiente la gestión del token aquí
    return usuario;
  }
}
