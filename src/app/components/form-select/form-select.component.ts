import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

import { FieldConfig } from 'projects/dynamic-form/src/lib/models/field-config.interface';
import { Field } from 'projects/dynamic-form/src/lib/models/field.interface';


@Component({
  selector: 'form-select',
  styleUrls: ['form-select.component.scss'],
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  required: boolean;

  ngOnInit() {
    this.group.controls[this.config.name].setValue(this.config.value);
    this.required = this.hasRequiredValidator();
  }

  private hasRequiredValidator(): boolean {
    const controls = this.group.controls[this.config.name];
    if (controls.validator) {
      const validator = controls.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      } 
    }
    return false;
  }

}
