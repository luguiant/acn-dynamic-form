import { ValidatorFn, ValidationErrors } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean;
  readonly?: boolean;
  label?: string;
  name: string;
  options?: any[];
  placeholder?: string;
  type: string;
  unformat?: RegExp;
  validation?: ValidationConfig | ValidationConfig[];
  style?: string;
  message?: { label: string, class?: string }[];
  value?: any;
  title?: string;
  subtitle?: string;
  tooltip?: string;
  class?: string;
  hasError?: boolean;
  id: string;
  helper?: {
    level: string,
    message: string,
    charCounter?: number
  };
  parentControl?: {
    name: string,
    value: any
  } | {
    name: string,
    value: any
  }[];
}

export interface ValidationConfig {
  function: ValidatorFn;
  message: string;
  priority?: number;
}
