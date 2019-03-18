
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'projects/dynamic-form/src/lib/models/field-config.interface';
import { Field } from 'projects/dynamic-form/src/lib/models/field.interface';

@Component({
  selector: 'form-padding',
  styleUrls: ['form-padding.component.scss'],
  templateUrl: './form-padding.component.html',
})
export class FormPaddingComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
