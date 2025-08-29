import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentDto } from './dto/department.dto';
import { Department } from './entities/department.entity';
import { Position } from '../position/entities/position.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentRepo: Model<Department>,
    @InjectModel(Position.name) private positionRepo: Model<Position>,
  ) {}

  async create(dto: CreateDepartmentDto) {
    if ((await this.departmentRepo.find({ name: dto.name })).length === 0)
      return await this.departmentRepo.create(dto);
    throw new BadRequestException('already exist');
  }

  async findAll() {
    const departments = await this.departmentRepo.find();

    const departmentsWithPositions = await Promise.all(
      departments.map(async (dept) => {
        const positions = await this.positionRepo.find({
          departmentId: dept._id,
        });
        return {
          ...dept.toObject(),
          positions: positions,
        };
      }),
    );

    return departmentsWithPositions;
  }

  async findOne(id: string) {
    const department = await this.departmentRepo.findById(id);
    if (!department) return null;

    const positions = await this.positionRepo.find({ departmentId: id });
    return {
      ...department.toObject(),
      positions: positions,
    };
  }

  async update(id: string, dto: CreateDepartmentDto) {
    const updated = await this.departmentRepo.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('department not found');
    return updated;
  }

  async remove(id: string) {
    const existed = await this.departmentRepo.findById(id);
    if (!existed) {
      throw new NotFoundException('department not found');
    }
    await this.positionRepo.deleteMany({ departmentId: id });
    return await this.departmentRepo.findByIdAndDelete(id);
  }

  async findAllWithPositions() {
    return this.findAll();
  }
}
