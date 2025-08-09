import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Custom validation decorators for common patterns
 */

/**
 * Validates phone number format
 */
@ValidatorConstraint({ name: 'isPhoneNumber', async: false })
export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string, args: ValidationArguments) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return typeof phoneNumber === 'string' && phoneRegex.test(phoneNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Phone number must be a valid international format';
  }
}

export function IsPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberConstraint,
    });
  };
}

/**
 * Validates Telegram username format
 */
@ValidatorConstraint({ name: 'isTelegramUsername', async: false })
export class IsTelegramUsernameConstraint
  implements ValidatorConstraintInterface
{
  validate(username: string, args: ValidationArguments) {
    const telegramUsernameRegex = /^@?[a-zA-Z0-9_]{5,32}$/;
    return typeof username === 'string' && telegramUsernameRegex.test(username);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Telegram username must be 5-32 characters long and contain only letters, numbers, and underscores';
  }
}

export function IsTelegramUsername(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTelegramUsernameConstraint,
    });
  };
}

/**
 * Validates that a date is not in the future
 */
@ValidatorConstraint({ name: 'isNotFutureDate', async: false })
export class IsNotFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date, args: ValidationArguments) {
    if (!(date instanceof Date)) {
      return false;
    }
    return date <= new Date();
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date cannot be in the future';
  }
}

export function IsNotFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotFutureDateConstraint,
    });
  };
}

/**
 * Validates minimum age requirement
 */
@ValidatorConstraint({ name: 'isMinimumAge', async: false })
export class IsMinimumAgeConstraint implements ValidatorConstraintInterface {
  validate(birthDate: Date, args: ValidationArguments) {
    if (!(birthDate instanceof Date)) {
      return false;
    }

    const minAge = args.constraints[0] || 18;
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= minAge;
    }

    return age >= minAge;
  }

  defaultMessage(args: ValidationArguments) {
    const minAge = args.constraints[0] || 18;
    return `Age must be at least ${minAge} years`;
  }
}

export function IsMinimumAge(
  minAge: number = 18,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [minAge],
      validator: IsMinimumAgeConstraint,
    });
  };
}

/**
 * Validates that a string contains only letters and spaces
 */
@ValidatorConstraint({ name: 'isFullName', async: false })
export class IsFullNameConstraint implements ValidatorConstraintInterface {
  validate(fullName: string, args: ValidationArguments) {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    return typeof fullName === 'string' && nameRegex.test(fullName.trim());
  }

  defaultMessage(args: ValidationArguments) {
    return 'Full name must contain only letters and spaces, and be 2-50 characters long';
  }
}

export function IsFullName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFullNameConstraint,
    });
  };
}

/**
 * Validates salary range
 */
@ValidatorConstraint({ name: 'isSalaryRange', async: false })
export class IsSalaryRangeConstraint implements ValidatorConstraintInterface {
  validate(salary: number, args: ValidationArguments) {
    const minSalary = args.constraints[0] || 0;
    const maxSalary = args.constraints[1] || 1000000;

    return (
      typeof salary === 'number' && salary >= minSalary && salary <= maxSalary
    );
  }

  defaultMessage(args: ValidationArguments) {
    const minSalary = args.constraints[0] || 0;
    const maxSalary = args.constraints[1] || 1000000;
    return `Salary must be between ${minSalary} and ${maxSalary}`;
  }
}

export function IsSalaryRange(
  minSalary: number = 0,
  maxSalary: number = 1000000,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [minSalary, maxSalary],
      validator: IsSalaryRangeConstraint,
    });
  };
}

/**
 * Validates MongoDB ObjectId format
 */
@ValidatorConstraint({ name: 'isMongoId', async: false })
export class IsMongoIdConstraint implements ValidatorConstraintInterface {
  validate(id: string, args: ValidationArguments) {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return typeof id === 'string' && objectIdRegex.test(id);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid MongoDB ObjectId format';
  }
}

export function IsMongoId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMongoIdConstraint,
    });
  };
}
