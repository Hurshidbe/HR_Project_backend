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
      personalInfo: employee.personalInfo,
      // certificates: employee.certificates,
      convicted: employee.criminalRecord,
      course: employee.course,
      drivingLicence: employee.drivingLicence,
      educationEnded: employee.education,
      experienceCompany: employee.experience,
      langGrades: employee.langGrades,
      extraInfo: employee.extraInfo,
      hardSkills: employee.hardSkills,
      softSkills: employee.softSkills,
      criminalRecord: employee.criminalRecord,
    });
    console.log(created);
  }
}
