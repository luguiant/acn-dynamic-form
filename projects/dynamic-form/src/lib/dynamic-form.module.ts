import { NgModule, ModuleWithProviders, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';

import { AmountFieldDirective } from './directives/amount-field/amount-field.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DynamicFieldDirective } from './directives/dynamic-field/dynamic-field.directive';
import { InputConfig } from './config/inputs.config';
export { FieldConfig, ValidationConfig } from './models/field-config.interface';

const EXPORTS = [
  DynamicFieldDirective,
  AmountFieldDirective,
  DynamicFormComponent,
];


const IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule
];

export const DECLARATIONS = [
  DynamicFormComponent,
  DynamicFieldDirective,
  AmountFieldDirective
];

@NgModule({
  declarations: [
    ...DECLARATIONS
  ],
  imports: [
    IMPORTS
  ],
  exports: [
    ...EXPORTS
  ],
  entryComponents: []
})
export class DynamicFormModule {
  component: any; 
  static forRoot(components: any): ModuleWithProviders {
    return {
      ngModule: DynamicFormModule,
      providers: [
          {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components.entryComponents, multi: true},
          {provide: InputConfig, useValue: components, multi: true}
      ]
    }
  }
}
