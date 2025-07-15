import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './entities/admin.schema';
import { Model } from 'mongoose';
import { createAdminDto, LoginDto } from './dto/admin.dto';
import { JwtService } from '@nestjs/jwt';
import { Candidate } from '../candidates/entities/candidate.schema';
import { Statuses } from 'src/enums/enums';
import { response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Admin.name) private readonly AdminRepo: Model<Admin>,
    @InjectModel(Candidate.name)
    private readonly CandidateRepo: Model<Candidate>,
    private readonly jwt: JwtService,
  ) {}

  async create(data: createAdminDto) {
    const saved = await this.AdminRepo.create(data);
    return { status: 'success', saved };
  }

  async login(data: LoginDto) {
    const isMatch = await this.AdminRepo.findOne({
      username: data.username,
      password: data.password,
    });
    if (!isMatch)
      throw new BadRequestException('incorrect username or password');
    const token = await this.jwt.signAsync({
      username: isMatch.username,
      role: isMatch.role,
      id: isMatch.id,
    });
    return { status: 'success', token };
  }

  async findAll() {
    const allUsers = await this.AdminRepo.find();
    return { status: 'success', allUsers };
  }

  async findOne(id: string) {
    const isMatch = await this.AdminRepo.findById({ _id: id });
    if (!isMatch) throw new NotFoundException('user not found');
    return { status: 'success', isMatch };
  }

  async addUser(data: createAdminDto) {
    const saved = await this.AdminRepo.create(data);
    return { status: 'success', saved };
  }

  async update(id: string, data: LoginDto) {
    const isMatch = await this.AdminRepo.findById(id);
    if (!isMatch) throw new NotFoundException('user not found');
    Object.assign(isMatch, data);
    return await isMatch.save();
  }

  remove(id: string) {
    return this.AdminRepo.deleteOne({ _id: id });
  }

  // async updateOne(id: string, action: Statuses) {
  //   const updated = await this.CandidateRepo.updateOne(
  //     { _id: id },
  //     { status: action },
  //   );
  //   return { status: 'success', updated };
  // }

  // async getAll(filter?: any) {
  //   return this.CandidateRepo.find(filter);
  // }
}
