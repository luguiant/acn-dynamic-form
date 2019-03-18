import { Component, ViewChild } from '@angular/core';
import { DynamicFormComponent, FieldConfig } from 'projects/dynamic-form/src/public-api';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  @ViewChild('form') form: DynamicFormComponent;
  config: FieldConfig[];

  constructor(){
    this.config = [
      {
        name: 'typeOption',
        label: 'Select',
        type: 'select',
        id: 'option',
        value: 'no',
        class: 'col-md-2 col-sm-6 col-6  mt-5',
        options: [
          {
            value: 'yes',
            label: 'Yes'
          },
          {
            value: 'no',
            label: 'No'
          }
        ],
        validation: [
          {
            function: Validators.required,
            message: 'Error: select is required.'
          }
        ]
      },
      {
        name: 'typeOption2',
        label: 'Select',
        type: 'select',
        id: 'option2',
        class: 'col-md-2 col-sm-6 col-6  mt-5',
        options: [
          {
            value: 'yes',
            label: 'Yes'
          },
          {
            value: 'no',
            label: 'No'
          }
        ],
        parentControl: [
          {
            name: 'typeOption',
            value: 'yes',
          }
        ],
        validation: [
          {
            function: Validators.required,
            message: 'Error: select is required.'
          }
        ]
      },
      {
        name: 'nextButton',
        label: 'SAVE',
        type: 'submit',
        class: 'col-md-2 col-sm-6 col-6  mt-5',
        style: 'col-md-3 col   primary-gray float-right',
        id: 'continueBtn'
      }
    ];
  }
  title = 'acn-dynamic-form';

  submit($event) {
    //  pinta el estado de formulario console.log(this.form.valid);
    //  pinta los input del formulario han sido llenados console.log($event);
    if(this.form.valid) {
       // el envio cumple los datos pasas 
    } else {
      // no se cumplieron las validaciones del formulario 
      this.form.findInvalidFields();
    }
    
  }
}
