import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // Para no tener que importar el módulo en cada componente
      global: true,
      useFactory: async (config: ConfigService) => ({
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
