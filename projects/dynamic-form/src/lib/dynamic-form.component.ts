import { Component, EventEmitter, Input, OnChanges, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, ValidationErrors } from '@angular/forms';

import { FieldConfig, ValidationConfig } from './models/field-config.interface';
import { forceValidationError } from './consts/validators';

@Component({
  exportAs: 'dynamicForm',
  selector: 'acn-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() config: FieldConfig[] = [];

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() reset: EventEmitter<any> = new EventEmitter<any>();
  @Output() isVisible: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  cleanValues = false;
  get controls() { return this.config.filter(({ type }) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }
  set value(_value) { this.value = _value; }
  set valid(_valid) { this.valid = _valid; }
  constructor(public fb: FormBuilder) { }

  ngOnInit() {

    this.formatValidators();

    this.form = this.createGroup();
    this.form.updateValueAndValidity();
  }

  ngAfterViewInit() {
    this.isVisible.emit();

  }
  ngOnChanges() {
    this.formatValidators();
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item.name);

      this.config.forEach(control => {
        this.validateParent(control);
        if (this.cleanValues) {
          this.setValue(control.name, control.value);
        }
      });
      this.form.updateValueAndValidity();

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => {
      group.addControl(control.name, this.createControl(control));
    });
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value, parentControl } = config;
    return this.fb.control({ disabled, value }, parentControl ? [] :
      (validation ? this.getValidatorFunctions(config) : []));
  }

  handleSubmit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.removeValidationError();
    this.submit.emit(this.unformatValues());
  }

  handleReset(event: any) {
    this.reset.emit();
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }

  getValue(name: string) {
    return this.form.controls[name].value;
  }

  setValidators(name: string, validator: any) {
    this.form.controls[name].setValidators(validator);
    this.form.controls[name].updateValueAndValidity();

  }

  findInvalidFields() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {

        this.setInvalid(name, true);
      } else {
        this.setInvalid(name, false);
      }
    }
    return invalid;
  }


  setInvalid(name: string, error: boolean) {
    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.hasError = error;
      }
      return item;
    });
  }

  validateParent(config:any) {
    if (config.parentControl) {
      if (!Array.isArray(config.parentControl)) {
        config.parentControl = [config.parentControl];
      }
      let showControl = true;
      config.parentControl.forEach(parent => {
        const parentValue = this.getValue(parent.name);
        if (Array.isArray(parent.value)) {
          let isAnyValue = false;
          parent.value.forEach(
            value => {
              if (parentValue === value) {
                isAnyValue = true;
              }
            }
          );
          if (!isAnyValue) {
            this.setValue(config.name, undefined);
            isAnyValue = false;
          }
          showControl = isAnyValue;
        } else {
          if (parentValue === parent.value) {
            if (showControl) {
              showControl = true;
            }
          } else {
            this.setValue(config.name, undefined);
            showControl = false;
          }
        }
      });
      if (showControl) {

        this.setValidators(config.name, this.getValidatorFunctions(config));
      } else {
        this.setValidators(config.name, []);
      }
      return showControl;
    } else {
      this.setValidators(config.name, this.getValidatorFunctions(config));
      return true;
    }
  }

  getValidatorFunctions(config: FieldConfig) {
    const validationArray = [];
    if (config.validation[0] !== undefined) {
      (config.validation as ValidationConfig[]).forEach(validation => {
        validationArray.push(validation.function);
      });
    }
    return validationArray;
  }

  private formatValidators() {
    this.config.forEach(config => {
      if (!Array.isArray(config.validation)) {
        config.validation = [config.validation];
      }
    });
  }

  unformatValues() {
    const value = this.form.value;
    this.config.forEach(config => {
      if (config.unformat && this.form.value[config.name]) {
        value[config.name] = this.getValue(config.name).replace(config.unformat, '');
      }
    }
    );
    return value;
  }

  setValidationError(name: string, message: string) {
    const control = this.config.find(el => el.name === name);
    (control.validation as ValidationConfig[]).push(forceValidationError(message));
    this.setValidators(name, this.getValidatorFunctions(control));
  }

  removeValidationError() {
    this.config.forEach(
      control => {
        (control.validation as ValidationConfig[]).forEach((validation, index, validations) => {
          if (validation) {
            if (validation['isValidationError']) {
              validations.splice(index, 1);
              this.setValidators(control.name, this.getValidatorFunctions(control));
              this.setInvalid(control.name, false);
            }
          }
        });
      }
    );
  }
}

