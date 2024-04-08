import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLimpiezaDto } from './dto/create-limpieza.dto';
import { UpdateLimpiezaDto } from './dto/update-limpieza.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Limpieza } from './entities/limpieza.entity';
import { Model } from 'mongoose';
import { Habitacion } from 'src/habitacion/entities/habitacion.entity';

@Injectable()
export class LimpiezaService {
  constructor(
    @InjectModel('limpiezas')
    private readonly limpiezaModel: Model<Limpieza>,
    @InjectModel('habitaciones')
    private readonly habitacionModel: Model<Habitacion>,
  ) {}
  //GET
  async findAll(id: string) {
    try {
      const limpiezas = await this.limpiezaModel
        .find({ habitacion: id })
        .sort({ fecha: -1 });
      return { ok: true, resultado: limpiezas };
    } catch (e) {
      if (e.name == 'CastError') {
        throw new HttpException(
          {
            ok: false,
            resultado: 'Error: La id de habitación "' + id + '" no es válida',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          {
            ok: false,
            resultado: 'Error genérico',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async isCleansedToday(id: string) {
    try {
      const ultLimp = (await this.habitacionModel.findById(id)).ultimaLimpieza;
      const today = new Date();
      return ultLimp.getDate() == today.getDate() &&
        ultLimp.getMonth() == today.getMonth() &&
        today.getFullYear() == today.getFullYear()
        ? { ok: true }
        : { ok: false };
    } catch (e) {
      if (e.name == 'TypeError')
        throw new HttpException(
          'No se pudo encontrar la id ' +
            id +
            ' en la colección de habitaciones',
          HttpStatus.NOT_FOUND,
        );
      else if (e.name == 'CastError') {
        throw new HttpException(
          'La id ' + id + ' no es válida',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log(e);
        throw new HttpException(
          'No se pudo resolver la petición',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async CleansedToday() {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);
    const habitacionesLimpiasHoy = await this.limpiezaModel.find({
      fecha: { $gt: start, $lt: end },
    });
    const habitacionesIds = new Set(
      habitacionesLimpiasHoy.map((p) => p.habitacion.valueOf().toString()),
    );
    const habitaciones = await Promise.all(
      Array.from(habitacionesIds).map(
        async (e) => await this.habitacionModel.findById(e),
      ),
    );
    return { ok: true, resultado: habitaciones };
  }
  //POST
  async create(createLimpiezaDto: CreateLimpiezaDto) {
    const result = await this.limpiezaModel.create(createLimpiezaDto);
    await this.actualizarUltimaLimpieza(createLimpiezaDto);
    return { ok: true, resultado: result };
  }
  //PATCH
  async update(id: string, updateLimpiezaDto: UpdateLimpiezaDto) {
    try {
      delete updateLimpiezaDto.habitacion;
      const result = await this.limpiezaModel.findByIdAndUpdate(
        id,
        { $set: updateLimpiezaDto },
        { new: true },
      );
      if (result != null) {
        await this.actualizarUltimaLimpieza(result);
        return { ok: true, resultado: result };
      } else {
        throw { name: 'NotFound' };
      }
    } catch (e) {
      if (e.name == 'CastError') {
        throw new HttpException(
          { ok: false, error: 'Error: El id introducido no es válido' },
          HttpStatus.BAD_REQUEST,
        );
      } else if ((e.name = 'NotFound')) {
        throw new HttpException(
          {
            ok: false,
            error: 'Error: El id introducido no existe en la colección',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          { ok: false, error: 'Error: No se pudo modificar la limpieza' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  //UTIL
  private async actualizarUltimaLimpieza(dto: UpdateLimpiezaDto) {
    const limpiezas = await this.limpiezaModel.find({
      habitacion: dto.habitacion.valueOf().toString(),
    });
    const dates = limpiezas.map((limp) => limp.fecha.getTime());
    const maxDateStamp = Math.max(...dates);
    const newDate = new Date();
    newDate.setTime(maxDateStamp);
    await this.habitacionModel.findByIdAndUpdate(
      dto.habitacion.valueOf().toString(),
      { ultimaLimpieza: newDate },
    );
  }
}
