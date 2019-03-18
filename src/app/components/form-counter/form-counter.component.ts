
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'projects/dynamic-form/src/lib/models/field.interface';
import { FieldConfig } from 'projects/dynamic-form/src/public-api';



@Component({
  selector: 'form-counter',
  styleUrls: ['form-counter.component.scss'],
  templateUrl: './form-counter.component.html',
})
export class FormCounterComponent implements Field {

  config: FieldConfig;
  group: FormGroup;

}
