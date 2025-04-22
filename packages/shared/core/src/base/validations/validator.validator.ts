// src/utils/AppValidatorUtils.ts

export interface AppValidateErrors {
  [field: string]: string[];
}

export class AppValidatorUtils {
  private constructor() {} // impede instanciação

  static validateRequired(
    field: any,
    fieldName: string,
    validationErrors: AppValidateErrors
  ): boolean {
    const isEmpty =
      field === null ||
      field === undefined ||
      (typeof field === "string" && field.trim().length === 0);

    if (isEmpty) {
      this.addError(validationErrors, fieldName, `${fieldName} is required`);
      return false;
    }
    return true;
  }

  static validateMaxLength(
    field: string | null | undefined,
    fieldName: string,
    maxLength: number,
    validationErrors: AppValidateErrors
  ): boolean {
    if (field && field.trim().length > maxLength) {
      this.addError(
        validationErrors,
        fieldName,
        `${fieldName} exceeds max length`
      );
      return false;
    }
    return true;
  }

  static validateMaxValue(
    field: number | null | undefined,
    fieldName: string,
    maxValue: number,
    validationErrors: AppValidateErrors
  ): boolean {
    if (field !== null && field !== undefined && field > maxValue) {
      this.addError(
        validationErrors,
        fieldName,
        `${fieldName} exceeds max value`
      );
      return false;
    }
    return true;
  }

  static validateMinValue(
    field: number | null | undefined,
    fieldName: string,
    minValue: number,
    validationErrors: AppValidateErrors
  ): boolean {
    if (field !== null && field !== undefined && field < minValue) {
      this.addError(
        validationErrors,
        fieldName,
        `${fieldName} is below min value`
      );
      return false;
    }
    return true;
  }

  private static addError(
    validationErrors: AppValidateErrors,
    fieldName: string,
    message: string
  ) {
    if (!validationErrors[fieldName]) {
      validationErrors[fieldName] = [];
    }
    validationErrors[fieldName].push(message);
  }
}

/*
const errors: AppValidateErrors = {};

AppValidatorUtils.validateRequired("", "username", errors);
AppValidatorUtils.validateMaxLength("This is too long", "bio", 10, errors);

console.log(errors);
{
  username: ["username is required"],
  bio: ["bio exceeds max length"]
}
*/
