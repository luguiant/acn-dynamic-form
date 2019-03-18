import { FieldConfig } from 'projects/dynamic-form/src/lib/models/field-config.interface';
import { Field } from 'projects/dynamic-form/src/lib/models/field.interface';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'form-radio',
    templateUrl: 'form-radio.component.html',
    styleUrls: ['form-radio.component.scss']
})
export class FormRadioComponent implements Field {
    @Input() config;
    group;

    constructor() {
    }


}
