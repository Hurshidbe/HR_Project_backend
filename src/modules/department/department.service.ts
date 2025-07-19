import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentDto } from './dto/department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentRepo: Model<Department>,
  ) {}

  async create(dto: CreateDepartmentDto) {
    if ((await this.departmentRepo.find({ name: dto.name })).length === 0)
      return await this.departmentRepo.create(dto);
    throw new BadRequestException('already exist');
  }

  findAll() {
    return this.departmentRepo.find();
  }

  findOne(id: string) {
    return this.departmentRepo.findById(id);
  }

  async update(id: string, dto: CreateDepartmentDto) {
    const updated = await this.departmentRepo.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Department not found');
    return updated;
  }

  async remove(id: string) {
    const existed = await this.departmentRepo.findById(id);
    if (!existed) {
      throw new NotFoundException('department not found');
    }
    return await this.departmentRepo.findByIdAndDelete(id);
  }
}
