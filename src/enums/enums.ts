import { Employee } from 'src/modules/employee/entities/employee.schema';

export enum Sex {
  male = 'male',
  famale = 'famale',
}

export enum Region {
  Toshkent = 'Toshkent',
  Namangan = 'Namangan',
  Sirdaryo = 'Sirdaryo',
  Andijon = 'Andijon',
  Fargona = "Farg'ona",
  Jizzax = 'Jizzax',
  Qashqadaryo = 'Qashqadaryo',
  Navoiy = 'Navoiy',
  Buxoro = 'Buxoro',
  Samarqand = 'Samarqand',
  Surxondaryo = 'Surxondaryo',
  Xorazm = 'Xorazm',
}

export enum LangGrade {
  No = 'No',
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum DrivingGrade {
  No = 'No',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

export enum Statuses {
  process = 'process',
  accepted = 'accepted',
  rejected = 'rejected',
}

export enum UserRole {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
}

export enum EmployeeStatusEnum {
  working = 'working',
  fired = 'fired',
  probation = 'probation',
}
