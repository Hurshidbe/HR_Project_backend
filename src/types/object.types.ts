import { LangGrade, Region, Sex } from 'src/enums/enums';

// 1. LangGrade subdocument schema
export class LangGradeSchema {
  language: string;
  grade: LangGrade;
}

// Experience subdocument schema
export class Experience {
  Position: string;
  Company: string;
  Salary: string;
  StartDate: Date;
  EndDate: Date;
}

export class Education {
  Name: string;
  Speciality: string;
  StartedDate: Date;
  EndedDate: Date;
}

export class Course {
  Name: string;
  Profession: string;
}

export class PersonalInfo {
  photo: string;
  fullName: string;
  sex: Sex;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  tgUsername: string;
  region: Region;
  address: string;
  occupation: string;
}

export class JobRequirements {
  position: string;
  salary: string;
}
