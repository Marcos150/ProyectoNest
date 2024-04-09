import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        // Para no tener que importar el módulo en cada componente
        global: true,
        //Palabra secreta
        secret: config.get<string>('SECRET')
          ? config.get<string>('SECRET')
          : 'meGustaElQueso',
        signOptions: { expiresIn: '6h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
