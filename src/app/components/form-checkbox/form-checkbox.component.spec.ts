import { NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormCheckboxComponent } from './form-checkbox.component';

describe('FormCheckboxComponent', () => {
  let component: FormCheckboxComponent;
  let fixture: ComponentFixture<FormCheckboxComponent>;
  let fb: FormBuilder;
  const configMock = {
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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCheckboxComponent],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckboxComponent);
    component = fixture.componentInstance;
    fb = fixture.debugElement.injector.get(FormBuilder);
  });
  beforeEach(() => {
    component.config = configMock;
    component.group = fb.group({
      creditCardPaymentDetailField: ['$123', Validators.required],
      email: ['', Validators.required]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
