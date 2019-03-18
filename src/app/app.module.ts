import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Type } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicFormModule, DynamicFormService } from 'projects/dynamic-form/src/public-api';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { Field } from 'projects/dynamic-form/src/lib/models/field.interface';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { FormControlMessageComponent } from './components/form-control-message/form-control-message.component';

const components =  [
  FormCheckboxComponent,
  FormSelectComponent,
  FormButtonComponent
];

const DEPENDENCY = [
  FormCheckboxComponent,
  FormSelectComponent,
  FormButtonComponent
];

const TYPES: { [type: string]: Type<Field> } = {
  submit: FormButtonComponent,
  reset: FormButtonComponent,
  select: FormSelectComponent,
  checkbox: FormCheckboxComponent
};

const EXPORTS_LIB = [
  FormCheckboxComponent,
  FormSelectComponent,
  FormButtonComponent
];

const IMPORTS = [
  FormCheckboxComponent,
  FormSelectComponent,
  FormButtonComponent
];  


@NgModule({
  declarations: [
    AppComponent,
    ...DEPENDENCY,
    FormControlMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormModule.forRoot(
      { typesInput: TYPES, 
        dependency: DEPENDENCY,
        entryComponents: components,
        imports: IMPORTS
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
