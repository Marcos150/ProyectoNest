import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.buscar(login, password);
    if (!usuario) {
      throw new UnauthorizedException();
    }
    // Generamos un token con el login del usuario
    return await this.jwtService.signAsync({ login: login });
  }
}
