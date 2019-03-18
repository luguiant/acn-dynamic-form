
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from 'projects/dynamic-form/src/lib/models/field-config.interface';
import { Field } from 'projects/dynamic-form/src/lib/models/field.interface';


@Component({
  selector: 'form-label',
  styleUrls: ['form-label.component.scss'],
  templateUrl: './form-label.component.html',
})
export class FormLabelComponent implements Field {

  config: FieldConfig;
  group: FormGroup;

}
