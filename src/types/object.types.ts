import { Region, Sex } from 'src/enums/enums';

export class LangGrade {
  language: string;
  grade: LangGrade;
}

export class Experience {
  osition: string;
  company: string;
  salary: string;
  from: Date;
  to: Date;
}

export class Education {
  name: string;
  speciality: string;
  from: Date;
  to: Date;
}

export class Course {
  name: string;
  profession: string;
  from: Date;
  to: Date;
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
