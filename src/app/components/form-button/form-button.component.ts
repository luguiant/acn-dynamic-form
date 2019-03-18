import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from 'projects/dynamic-form/src/lib/models/field.interface';
import { FieldConfig } from 'projects/dynamic-form/src/lib/models/field-config.interface';


@Component({
  selector: 'form-button',
  styleUrls: ['form-button.component.scss'],
  templateUrl: './form-button.component.html',
})
export class FormButtonComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
