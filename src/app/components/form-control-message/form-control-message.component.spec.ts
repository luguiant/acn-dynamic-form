import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { FormControlMessageComponent } from './form-control-message.component';

describe('FormControlMessageComponent', () => {
  let component: FormControlMessageComponent;
  let fixture: ComponentFixture<FormControlMessageComponent>;
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
  const groupMock = {
    controls: [{
      creditCardPaymentDetailField: {
        value: 1
      }
    }]
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlMessageComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));


  beforeEach((inject([FormBuilder], (fb: FormBuilder) => {
    fixture = TestBed.createComponent(FormControlMessageComponent);
    component = fixture.componentInstance;
    component.config = configMock;
    component.group = fb.group({
      creditCardPaymentDetailField: ['Other Name', Validators.required],
      email: ['', Validators.required]
    });
  })));

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should test getErrorMessage valid', () => {
    component.getErrorMessage(component.group.controls['creditCardPaymentDetailField'], configMock.validation);
    expect(component).toBeTruthy();
  });

  it('should test getErrorMessage invalid', () => {
    component.getErrorMessage(component.group.controls['email'], configMock.validation);
    expect(component).toBeTruthy();
  });

  it('should test getValue', () => {
    expect(component.getValue()).toEqual('Other Name');
    component.group.controls['creditCardPaymentDetailField'].setValue(undefined);
    expect(component.getValue()).toEqual('');
  });
});
