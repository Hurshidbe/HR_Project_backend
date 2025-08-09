export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

/**
 * Regions of Uzbekistan
 */
export enum Region {
  TOSHKENT = 'Toshkent',
  NAMANGAN = 'Namangan',
  SIRDARYO = 'Sirdaryo',
  ANDIJON = 'Andijon',
  FARGONA = 'Fargona',
  JIZZAX = 'Jizzax',
  QASHQADARYO = 'Qashqadaryo',
  NAVOIY = 'Navoiy',
  BUXORO = 'Buxoro',
  SAMARQAND = 'Samarqand',
  SURXONDARYO = 'Surxondaryo',
  XORAZM = 'Xorazm',
}

/**
 * Language proficiency levels based on CEFR
 */
export enum LanguageLevel {
  NONE = 'No',
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

/**
 * Driving license categories
 */
export enum DrivingLicense {
  NONE = 'No',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

/**
 * Candidate application statuses
 */
export enum CandidateStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  REVIEWING = 'reviewing',
}

/**
 * User roles in the system
 */
export enum UserRole {
  SUPER_ADMIN = 'superadmin',
  ADMIN = 'admin',
}

/**
 * Employee work statuses
 */
export enum EmployeeStatus {
  WORKING = 'working',
  FIRED = 'fired',
  PROBATION = 'probation',
}
