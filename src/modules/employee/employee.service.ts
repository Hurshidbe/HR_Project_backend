import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities/employee.schema';
import { Model } from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private readonly EmployeeRepo: Model<Employee>,
  ) {}

  async create(employee: CreateEmployeeDto) {
    const created = await this.EmployeeRepo.create({
      address: employee.address,
      birthDate: employee.birthDate,
      certificates: employee.certificates,
      computerSkills: employee.computerSkills,
      convicted: employee.convicted,
      courseName: employee.courseName,
      courseProfession: employee.courseProfession,
      drivingGrade: employee.drivingGrade,
      educationEnded: employee.educationEnded,
      educationName: employee.educationName,
      educationSpeciality: employee.educationSpeciality,
      educationStarted: employee.educationStarted,
      email: employee.email,
      experienceCompany: employee.experienceCompany,
      experienceEnd: employee.experienceEnd,
      experiencePosition: employee.experiencePosition,
      experienceSalary: employee.experienceSalary,
      experienceStart: employee.experienceStart,
      fullName: employee.fullName,
      langGrades: employee.langGrades,
      moreInfo: employee.moreInfo,
      phoneNumber: employee.phoneNumber,
      photo: employee.photo,
      profession: employee.profession,
      proSkills: employee.proSkills,
      region: employee.region,
      sex: employee.sex,
      softSkills: employee.softSkills,
      tgUsername: employee.tgUsername,
      workPosition: employee.workPosition,
      workSalary: employee.workSalary,
    });
    console.log(created);
  }
}
