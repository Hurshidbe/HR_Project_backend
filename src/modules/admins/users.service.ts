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
    const user = await this.AdminRepo.findOne({ username: data.username });
    if (!user) throw new BadRequestException('username or password incorrect');
    if (user.password !== data.password)
      throw new BadRequestException('username or password incorrect');
    console.log(user);
    const token = await this.jwt.signAsync({
      username: user.username,
      role: user.role,
      id: user.id,
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
    if (data.username === 'admin')
      throw new BadRequestException('try another username');
    const isMatch = await this.AdminRepo.findById(id);
    if (!isMatch) throw new NotFoundException('user not found');
    Object.assign(isMatch, data);
    return await isMatch.save();
  }

  async remove(id: string) {
    const isMatch = await this.AdminRepo.findById(id);
    if (!isMatch) throw new NotFoundException('user not found');
    return this.AdminRepo.findOneAndDelete({ _id: id });
  }
}
