import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { LimpiezaService } from './limpieza.service';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('limpieza')
export class LimpiezaController {
  constructor(private readonly limpiezaService: LimpiezaService) {}

  @Get('/limpias')
  CleansedToday() {
    return this.limpiezaService.CleansedToday();
  }

  @Get('/limpia/:id')
  isCleansedToday(@Param('id') id: string) {
    return this.limpiezaService.isCleansedToday(id);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.limpiezaService.findAll(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createLimpiezaDto: CreateLimpiezaDto) {
    return this.limpiezaService.create(createLimpiezaDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @UsePipes(ValidationPipe)
  Date(@Param('id') id: string, @Body() updateLimpiezaDto: UpdateLimpiezaDto) {
    return this.limpiezaService.update(id, updateLimpiezaDto);
  }
}
