import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Position } from './entities/position.entity';
import { Model } from 'mongoose';
import { CreatePositionDto } from './dto/position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectModel(Position.name) private readonly PositionRepo: Model<Position>,
  ) {}

  async create(data: CreatePositionDto) {
    return this.PositionRepo.create(data);
  }

  async getAll() {
    return this.PositionRepo.find().populate('departmentId');
  }

  async getById(id: string) {
    const isExist = await this.PositionRepo.findById(id);
    if (!isExist) throw new NotFoundException('position not found');
    return isExist;
  }

  async update(id: string, data: CreatePositionDto) {
    const updated = await this.PositionRepo.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Position not found');
    return updated;
  }

  async delete(id: string) {
    const isExist = await this.PositionRepo.findById(id);
    if (!isExist) throw new NotFoundException('Position not found');
    return await isExist.deleteOne();
  }
}
