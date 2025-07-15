import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCandidateDto } from './dto/candidate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './entities/candidate.schema';
import { Model, FilterQuery } from 'mongoose';
import { Status } from 'cloudinary';
import { EmployeeStatusEnum, Statuses } from 'src/enums/enums';
import { Employee } from '../employee/entities/employee.schema';
import { Department } from '../department/entities/department.entity';
import { Position } from '../position/entities/position.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name) private CandidateRepo: Model<Candidate>,
    @InjectModel(Employee.name) private EmployeeRepo: Model<Employee>,
  ) {}

  create(data: CreateCandidateDto, photo: string) {
    const candidate = new this.CandidateRepo({
      ...data,
      photo,
    });

    return candidate.save();
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
    EmployeeStatus: EmployeeStatusEnum,
  ) {
    const isExist = await this.CandidateRepo.findOne({ _id: id });
    if (!isExist) throw new NotFoundException('candidate not found by this id');
    const accepted = await this.EmployeeRepo.create({
      photo: isExist.photo,
      fullName: isExist.fullName,
      sex: isExist.sex,
      birthDate: isExist.birthDate,
      phoneNumber: isExist.phoneNumber,
      email: isExist.email,
      tgUsername: isExist.tgUsername,
      region: isExist.region,
      address: isExist.address,
      profession: isExist.profession,
      workPosition: isExist.workPosition,
      workSalary: isExist.workSalary,
      experienceCompany: isExist.experienceCompany,
      experiencePosition: isExist.experiencePosition,
      experienceEnd: isExist.experienceEnd,
      experienceSalary: isExist.experienceSalary,
      experienceStart: isExist.experienceStart,
      educationName: isExist.educationName,
      educationStarted: isExist.educationStarted,
      educationSpeciality: isExist.educationSpeciality,
      educationEnded: isExist.educationEnded,
      courseName: isExist.courseName,
      courseProfession: isExist.courseProfession,
      langGrades: isExist.langGrades,
      computerSkills: isExist.computerSkills,
      proSkills: isExist.proSkills,
      softSkills: isExist.softSkills,
      drivingGrade: isExist.drivingGrade,
      convicted: isExist.convicted,
      moreInfo: isExist.moreInfo,
      certificates: isExist.certificates,
      department,
      position,
      salary,
      EmployeeStatus,
    });
    console.log(isExist);
    return accepted;
  }
}
