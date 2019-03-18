import { ValidationConfig } from '../models/field-config.interface';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment_ from 'moment';
const moment = moment_;

function deleteIvalidChar(currentControl: AbstractControl) {
  currentControl.setValue(currentControl.value.substring(0, currentControl.value.length - 1));
}

export function RegexValidator(regexPattern: RegExp): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: any } => {
    if (currentControl.value !== undefined) {
      if (!regexPattern.test(currentControl.value)) {
        deleteIvalidChar(currentControl);
      }
      if (currentControl.value.length === 0 || currentControl.value[0] === ' ') {
        return { regexValidator: true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}


export function MaxLengthValidator(maxLength: number): ValidatorFn {
  return (currentControl: AbstractControl) => {
    if (currentControl.value !== undefined) {
      if (currentControl.value.length > maxLength) {
        deleteIvalidChar(currentControl);
      }
      return null;
    } else {
      return null;
    }
  };
}

export function MinValueValidator(minValue: number): ValidatorFn {
  return (currentControl: AbstractControl) => {
    if (currentControl.value !== undefined && currentControl.value !== '' && currentControl.value !== null ) {
      if (+currentControl.value.replace(/[^0-9.-]/g, '') < minValue) {
        return { MinValueValidator: true, espectedValue: minValue, actualValue: currentControl.value };
      }
      return null;
    } else {
      return null;
    }
  };
}

export function MaxValueValidator(maxValue: number): ValidatorFn {
  return (currentControl: AbstractControl) => {
    if (currentControl.value !== undefined && currentControl.value !== '' && currentControl.value !== null ) {
      if (+currentControl.value.replace(/[^0-9.-]/g, '') >= maxValue) {
        return { maxValueValidator: true, espectedValue: maxValue, actualValue: currentControl.value };
      }
      return null;
    } else {
      return null;
    }
  };
}

export function ValidatorError(): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: any } => {
    return { 'error': true };
  };
}

export function forceValidationError(message: string): ValidationConfig {
  const validationConfig = {
    function: ValidatorError(),
    message,
    priority: 0
  };
  validationConfig['isValidationError'] = true;
  return validationConfig;
}

export function MaxDateValidator(maxDate, inputFormat) {
  return (currentControl: AbstractControl) => {
    if (currentControl.value !== undefined) {
      const date1Date = new Date(moment(currentControl.value, inputFormat).format());
      let date2Date = new Date(moment(maxDate, inputFormat).format());
      if (isNaN(date2Date.getTime())) {
        const newDate = new Date();
        newDate.setFullYear(maxDate);
        date2Date = new Date(moment(newDate , inputFormat).format());
      }
      if (date1Date >= date2Date) {
        return { MaxDateValidator: true, espectedValue: maxDate, actualValue: currentControl.value };
      }
      return null;
    } else {
      return null;
    }
  };
}

export function MinDateValidator(minDate, inputFormat) {
  return (currentControl: AbstractControl) => {
    if (currentControl.value !== undefined) {
      const date1Date = new Date(moment(currentControl.value, inputFormat).format());
      const date2Date = new Date(moment(minDate, inputFormat).format());
      if (date1Date <= date2Date) {
        return { MinDateValidator: true, espectedValue: minDate, actualValue: currentControl.value };
      }
      return null;
    } else {
      return null;
    }
  };
}
