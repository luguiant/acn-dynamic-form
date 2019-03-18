import { FormCounterComponent } from '../../components/form-counter/form-counter.component';
import { FormTooltipComponent } from '../../components/form-tooltip/form-tooltip.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AmountFieldDirective } from '../amount-field/amount-field.directive';
import { DynamicFieldDirective } from './dynamic-field.directive';
/*
 * Testing an Angular directive
 * More info: https://angular.io/docs/ts/latest/guide/testing.html#!#pipes
 */
import { Component, NO_ERRORS_SCHEMA, ViewChild, inject, ComponentRef } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormPaddingComponent } from '../../components/form-padding/form-padding.component';
import { FormLabelComponent } from '../../components/form-label/form-label.component';
import { FormRadioComponent } from '../../components/form-radio/form-radio.component';
import { FormControlMessageComponent } from '../../components/form-control-message/form-control-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder, FormsModule } from '@angular/forms';

import { FormInputComponent } from '../../components/form-input/form-input.component';
import { FormSelectComponent } from '../../components/form-select/form-select.component';
import { FormButtonComponent } from '../../components/form-button/form-button.component';
import { Field } from '../../models/field.interface';


@Component({
  selector: 'container',
  template: `<div dynamicField [config]="configMock" [group]="group" class="inside">Container content</div>`
})
export class Container {
  constructor(public fb: FormBuilder) { }
  configMock = {
    name: 'creditCardPaymentDetailField',
    label: 'payments.credit.detailLabel',
    type: 'input',
    id: 'detailsField',
    class: 'col-md-6 col-12',
    helper: {
      message: 'payments.credit.helper',
      level: 'info',
      charCounter: 50
    },
    validation: [
      {
        function: Validators.required,
        message: undefined,
        priority: undefined
      },
      {
        function: Validators.required,
        message: 'payments.credit.detail.minLengthError',
        priority: 2
      },
      {
        function: Validators.required,
        message: 'payments.credit.detail.minLengthError',
        priority: 1
      },
      {
        function: Validators.required,
        message: undefined,
        priority: 1
      },

    ]
  };
  group;

  @ViewChild(DynamicFieldDirective) directive: DynamicFieldDirective;
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule, FormsModule

  ],
  declarations: [
    DynamicFieldDirective,
    FormInputComponent,
    AmountFieldDirective,
    FormTooltipComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormControlMessageComponent,
    FormRadioComponent,
    FormLabelComponent,
    FormPaddingComponent,
    FormCounterComponent,
    Container
  ],
  exports: [
    DynamicFieldDirective,
    AmountFieldDirective,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormControlMessageComponent,
    FormRadioComponent,
    FormLabelComponent,
    FormPaddingComponent,
    FormTooltipComponent,
    FormCounterComponent,
    Container
  ],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioComponent,
    FormLabelComponent,
    FormPaddingComponent,
    FormTooltipComponent,
    FormCounterComponent
  ],
})
export class DynamicFormTestModule { }

describe('DynamicFieldDirective', () => {
  let fixture: ComponentFixture<Container>;
  let comp: Container;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [DynamicFormTestModule],
    });
  });


  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(Container);
      comp = fixture.componentInstance;
    });
  }));


  beforeEach(() => {

    comp.group = comp.fb.group({
      creditCardPaymentDetailField: ['$123', Validators.required],
      email: ['', Validators.required]
    });
    fixture.detectChanges();
  }
  );

  it('should enter the assertion', () => {
    expect(comp.directive).toBeDefined();
    comp.directive.component = <any>{
      instance: {
        config: undefined,
        group: undefined
      }
    };
    comp.directive.ngOnChanges();
    expect(comp.directive.component.instance['config'].name).toEqual(comp.configMock.name);
  });

});
