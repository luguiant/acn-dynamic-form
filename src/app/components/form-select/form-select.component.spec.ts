import { FieldConfig } from '../../models/field-config.interface';
import { FormSelectComponent } from './form-select.component';
import { Validators, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormSelectComponent', () => {
  let comp: FormSelectComponent;
  let fixture: ComponentFixture<FormSelectComponent>;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSelectComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(FormSelectComponent);
    comp = fixture.componentInstance;
  });

  beforeEach((inject([FormBuilder], (fb: FormBuilder) => {
    comp.config = <FieldConfig>configMock;
    comp.group = fb.group({
      creditCardPaymentDetailField: ['$123', Validators.required],
      email: ['', Validators.required]
    });
    fixture.detectChanges();
  }
  )));

  it('can load instance', () => {
    expect(comp.required).toBeTruthy();
  });

  it('should test ngOninit validators non required', () => {
    comp.group.controls['creditCardPaymentDetailField'].setValidators([Validators.minLength(2)]);
    comp.ngOnInit();
    expect(comp.required).toBeFalsy();
  });

  it('should test ngOninit validators empty', () => {
    comp.group.controls['creditCardPaymentDetailField'].setValidators([]);
    comp.ngOnInit();
    expect(comp.required).toBeFalsy();
  });
});
