import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioDto } from '../usuario/dto/usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() usuarioDto: UsuarioDto) {
    const token = await this.authService.login(
      usuarioDto.login,
      usuarioDto.password,
    );
    return { ok: true, resultado: token };
  }
}
