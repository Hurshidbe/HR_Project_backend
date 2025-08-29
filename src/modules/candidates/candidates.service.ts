import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './entities/candidate.schema';
import { Model, FilterQuery } from 'mongoose';

import { Employee } from '../employee/entities/employee.schema';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';
import { CreateCandidateDto } from './dto/main.candidate.dto';
import { CandidateStatuses, EmployeeStatusEnum } from 'src/enums/enums';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name) private CandidateRepo: Model<Candidate>,
    @InjectModel(Employee.name) private EmployeeRepo: Model<Employee>,
  ) {}

  async create(data: CreateCandidateDto) {
    const candidate = await this.CandidateRepo.create(data);
    return candidate;
  }

  async getAll(filter: FilterQuery<Candidate>) {
    return this.CandidateRepo.find(filter);
  }
  async deleteById(id: string) {
    return this.CandidateRepo.deleteOne({ _id: id });
  }
  async rejectCandidate(id: string) {
    const isExist = await this.CandidateRepo.findOne({ _id: id });
    if (!isExist) throw new NotFoundException('user not found');

    return this.CandidateRepo.findByIdAndUpdate(
      id,
      { status: CandidateStatuses.rejected },
      { new: true },
    );
  }

  async acceptCandidate(
    id: string,
    department: Department,
    position: Position,
    salary: number,
    employeeStatus: EmployeeStatusEnum,
  ) {
    const isExist = await this.CandidateRepo.findOne({ _id: id });
    if (!isExist) throw new NotFoundException('candidate not found by this id');
    const accepted = await this.EmployeeRepo.create({
      fullName: isExist.fullName,
      sex: isExist.sex,
      birthDate: isExist.birthDate,
      phoneNumber: isExist.phoneNumber,
      email: isExist.email,
      tgUsername: this.normalizeTelegramUsername(isExist.tgUsername),
      region: isExist.region,
      address: isExist.address,
      occupation: isExist.occupation,
      jobRequirement: isExist.jobRequirement,
      experience: isExist.experience,
      education: isExist.education,
      course: isExist.course,
      langGrades: isExist.langGrades,
      hardSkills: isExist.hardSkills,
      softSkills: isExist.softSkills,
      drivingLicence: isExist.drivingLicence,
      criminalRecords: isExist.criminalRecords,
      extraInfo: isExist.extraInfo,
      telegramId: isExist.telegramId,

      department,
      position,
      salary,
      employeeStatus,
    });
    return accepted;
  }

  async findOne(id: string) {
    const candidate = this.CandidateRepo.findById(id);
    return candidate;
  }

  async delete(id: string) {
    const deleted = await this.CandidateRepo.deleteOne({ _id: id });
    return deleted;
  }

  async normalizeTelegramUsername(username: string) {
    if (!username) return null;

    username = username.trim();

    if (username.startsWith('https://t.me/')) {
      username = username.replace('https://t.me/', '');
    } else if (username.startsWith('http://t.me/')) {
      username = username.replace('http://t.me/', '');
    } else if (username.startsWith('t.me/')) {
      username = username.replace('t.me/', '');
    }
    if (username.startsWith('@')) {
      username = username.substring(1);
    }

    return username;
  }
}
