import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Position } from './entities/position.entity';
import mongoose, { Model } from 'mongoose';
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
    try {
      const positions = await this.PositionRepo.find().lean();
      return positions;
    } catch (error) {
      throw new HttpException('Failed to fetch positions', 500);
    }
  }

  async getAllWithPopulatedDepartments() {
    try {
      const positions = await this.PositionRepo.find()
        .populate('departmentId', 'name _id')
        .lean();
      return positions;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch positions with populated departments',
        500,
      );
    }
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

  async getPositionById(id: mongoose.Types.ObjectId) {
    return this.PositionRepo.findById(id);
  }
}
