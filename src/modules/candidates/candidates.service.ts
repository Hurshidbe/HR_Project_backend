import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './entities/candidate.schema';
import { Model, FilterQuery } from 'mongoose';
import { Status } from 'cloudinary';
import { EmployeeStatusEnum, Statuses } from 'src/enums/enums';
import { Employee } from '../employee/entities/employee.schema';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';
import { CreateCandidateDto } from './dto/main.candidate.dto';

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

  async rejectCandidate(id: string) {
    const isExist = await this.CandidateRepo.findOne({ _id: id });
    if (!isExist) throw new NotFoundException('user not found');

    return this.CandidateRepo.findByIdAndUpdate(
      id,
      { status: Statuses.rejected },
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
      personalInfo: isExist.personalInfo,
      jobRequirements: isExist.jobRequirements,
      experience: isExist.experience,
      education: isExist.education,
      course: isExist.course,
      langGrades: isExist.langGrades,
      hardSkills: isExist.hardSkills,
      softSkills: isExist.softSkills,
      drivingLicence: isExist.drivingLicence,
      criminalRecord: isExist.criminalRecords,
      extraInfo: isExist.extraInfo,
      // certificates: isExist.certificates,
      department,
      position,
      salary,
      employeeStatus: employeeStatus,
    });
    return accepted;
  }

  async findOne(id: string) {
    return this.CandidateRepo.findById(id);
  }
}
