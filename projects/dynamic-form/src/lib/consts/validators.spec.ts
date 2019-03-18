import { AbstractControl, FormControl } from '@angular/forms';
/*
 * Testing a TypeScript class
 * More info: https://angular.io/docs/ts/latest/guide/testing.html#!#testing-without-atp
 */

import { RegexValidator, MaxLengthValidator, ValidatorError, forceValidationError } from './validators';

describe('EnterAClassName', () => {
  const currentControl: AbstractControl = new FormControl();

  beforeEach(() => {
    // write your set up here
  });

  it('should test regex valid', () => {
    currentControl.setValue('AS');
    expect(RegexValidator(/^[A-Z]*$/)(currentControl)).toBe(null);
  });

  it('should test regex valid and space', () => {
    currentControl.setValue(' ');
    expect(RegexValidator(/^[A-Z\s]*$/)(currentControl).regexValidator).toBe(true);
  });

  it('should test regex invalid', () => {
    currentControl.setValue('ASs');
    expect(RegexValidator(/^[A-Z]*$/)(currentControl)).toBe(null);
    expect(currentControl.value).toBe('AS');
  });

  it('should test regex invalid and empty', () => {
    currentControl.setValue('s');
    expect(RegexValidator(/^[A-Z]*$/)(currentControl).regexValidator).toBe(true);
    expect(currentControl.value).toBe('');
  });

  it('should test regex value undefined', () => {
    currentControl.setValue(undefined);
    expect(RegexValidator(/^[A-Z]*$/)(currentControl)).toBe(null);
  });


  it('should test MaxLengthValidator valid', () => {
    currentControl.setValue('12');
    expect(MaxLengthValidator(3)(currentControl)).toBe(null);
  });

  it('should test MaxLengthValidator invalid', () => {
    currentControl.setValue('12');
    expect(MaxLengthValidator(1)(currentControl)).toBe(null);
    expect(currentControl.value).toBe('1');
  });

  it('should test MaxLengthValidator undefined', () => {
    currentControl.setValue(undefined);
    expect(MaxLengthValidator(2)(currentControl)).toBe(null);
  });

  it('should test ValidatorError', () => {
    currentControl.setValue(undefined);
    expect(ValidatorError()(currentControl).error).toBe(true);
  });

  it('should test forceValidationError', () => {
    currentControl.setValue(undefined);
    expect(forceValidationError('message')['isValidationError']).toBe(true);
    expect(forceValidationError('message')['message']).toBe('message');
    expect(forceValidationError('message')['priority']).toBe(0);
  });
});
