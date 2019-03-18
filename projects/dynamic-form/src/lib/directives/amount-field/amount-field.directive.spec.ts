import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmountFieldDirective } from './amount-field.directive';
/*
 * Testing an Angular directive
 * More info: https://angular.io/docs/ts/latest/guide/testing.html#!#pipes
 */

import { Component, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


@Component({
  selector: 'container',
  template: `<input amountField [config]="configMock" [group]="group" />`
})
export class Container {
  @ViewChild(AmountFieldDirective) directive: AmountFieldDirective;

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

  constructor(private fb: FormBuilder) {
    this.group = fb.group({
      creditCardPaymentDetailField: ['$123', Validators.required],
      email: ['', Validators.required]
    });
  }
}

describe('AmountFieldDirective', () => {
  let fixture: ComponentFixture<Container>;
  let component: AmountFieldDirective;
  let container: Container;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AmountFieldDirective,
        Container
      ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(Container);
      container = fixture.componentInstance;
      component = container.directive;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });







  it('should test validations, allowedkey if', () => {
    const event = {
      keyCode: 9
    };
    expect(component.validateAllowedKeys(event)).toBeTruthy();
  });

  it('should test validations, allowedkey else', () => {
    const event = {
      keyCode: 1
    };
    expect(component.validateAllowedKeys(event)).toBeFalsy();
  });

  it('should test validations, validate decimal else', () => {
    const event = {
      keyCode: 1,
      target: {
        value: '12',
        selectionStart: 0
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateDecimal(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should test validations, validate decimal if if', () => {
    const event = {
      keyCode: 1,
      key: '.',
      target: {
        value: '12.',
        selectionStart: 0
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateDecimal(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should test validations, validate decimal if else if', () => {
    const event = {
      keyCode: 1,
      key: '1',
      target: {
        value: '12.12',
        selectionStart: 5
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateDecimal(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should test validations, validate decimal if else else', () => {
    const event = {
      keyCode: 1,
      key: '1',
      target: {
        value: '12.12',
        selectionStart: 1
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateDecimal(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should test validations, validate pattern if ', () => {
    const event = {
      keyCode: 1,
      key: 'd',
      target: {
        value: '12.12',
        selectionStart: 1
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validatePattern(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should test validations, validate pattern else ', () => {
    const event = {
      keyCode: 1,
      key: '1',
      target: {
        value: '12.12',
        selectionStart: 1
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validatePattern(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });


  it('should test validations, validateLength else ', () => {
    const event = {
      keyCode: 1,
      key: '0',
      target: {
        value: '1',
        selectionStart: 1
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateLength(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });


  it('should test validations,  validateLength if if', () => {
    const event = {
      keyCode: 1,
      key: '.',
      target: {
        value: '123456789',
        selectionStart: 9
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateLength(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });


  it('should test validations,  validateLength if else if if', () => {
    const event = {
      keyCode: 1,
      key: '1',
      target: {
        value: '123456789.',
        selectionStart: 9
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateLength(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });


  it('should test validations,  validateLength if else if else', () => {
    const event = {
      keyCode: 1,
      key: '1',
      target: {
        value: '123456789.12',
        selectionStart: 6
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateLength(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });


  it('should test validations,  validateLength if else else', () => {
    const event = {
      keyCode: 1,
      key: '1',
      target: {
        value: '123456789',
        selectionStart: 6
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateLength(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });


  it('should test validations,  validateBackspace else', () => {
    const event = {
      keyCode: 1,
      key: '1',
      target: {
        value: '123456789',
        selectionStart: 6
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.valueMasked = '1.1';
    component.validateBackspace(event);
    expect(component.valueMasked).toEqual('1.1');
  });


  it('should test validations,  validateBackspace if if ', () => {
    const event = {
      keyCode: 8,
      key: '.',
      target: {
        value: '1.89',
        selectionStart: 2
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    component.validateBackspace(event);
    expect(component.valueMasked).toEqual('');
  });

  it('should test validations,  validateBackspace if else if ', () => {
    const event = {
      keyCode: 8,
      key: ',',
      target: {
        value: '1,111.89',
        selectionStart: 2,
        setSelectionRange: () => { }
      },
      preventDefault: () => { }
    };
    spyOn(event, 'preventDefault');
    spyOn(event.target, 'setSelectionRange');
    component.validateBackspace(event);
    expect(event.target.setSelectionRange).toHaveBeenCalled();
  });

  it('should test validations,  validateBackspace if else if ', () => {
    const event = {
      keyCode: 8,
      key: ',',
      target: {
        value: '1111.89',
        selectionStart: 2
      },
      preventDefault: () => { }
    };
    spyOn(component, 'validateAllowedKeys').and.returnValue(true);
    spyOn(component, 'validateDecimal');
    spyOn(component, 'validatePattern');
    spyOn(component, 'validateLength');
    spyOn(component, 'validateBackspace');
    component.validations(event);
    expect(component.validateLength).not.toHaveBeenCalled();
  });

  it('should test validations,  validateBackspace if else if ', () => {
    const event = {
      keyCode: 8,
      key: ',',
      target: {
        value: '1111.89',
        selectionStart: 2
      },
      preventDefault: () => { }
    };
    spyOn(component, 'validateAllowedKeys').and.returnValue(false);
    spyOn(component, 'validateDecimal');
    spyOn(component, 'validatePattern');
    spyOn(component, 'validateLength');
    spyOn(component, 'validateBackspace');
    component.validations(event);
    expect(component.validateLength).toHaveBeenCalled();
  });



  it('should test ontextInput if ', () => {
    const event = {
      keyCode: 8,
      key: ',',
      target: {
        value: '1,111.89',
        selectionStart: 2,
        setSelectionRange: () => { }
      },
      preventDefault: () => { }
    };
    component.carret = 1;
    spyOn(event, 'preventDefault');
    spyOn(event.target, 'setSelectionRange');
    component.ontextInput(event);
    expect(event.target.setSelectionRange).not.toHaveBeenCalled();
  });


  it('should test ontextInput else ', () => {
    const event = {
      keyCode: 8,
      key: ',',
      target: {
        value: '1,111.89',
        selectionStart: 2,
        setSelectionRange: () => { }
      },
      preventDefault: () => { }
    };
    component.carret = 2;
    spyOn(event, 'preventDefault');
    spyOn(event.target, 'setSelectionRange');
    component.ontextInput(event);
    expect(event.target.setSelectionRange).not.toHaveBeenCalled();
  });


  it('should test addComma else', () => {
    expect(component.addComma('1222')).toEqual('1,222');
  });
  it('should test addComma if', () => {
    expect(component.addComma('1222.22')).toEqual('1,222.22');
  });





  it('should test blurInput', () => {
    component.valueMasked = '123';
    component.blurInput();
    expect(component.valueMasked).toEqual('123.00');
  });

  it('should test blurInput', () => {
    component.valueMasked = '123.0';
    component.blurInput();
    expect(component.valueMasked).toEqual('123.00');
  });

  it('should test blurInput', () => {
    component.valueMasked = '0';
    component.blurInput();
    expect(component.valueMasked).toEqual('0.00');
  });

  it('should test blurInput', () => {
    component.valueMasked = '.00';
    component.blurInput();
    expect(component.valueMasked).toEqual('0.00');
  });

  it('should test blurInput', () => {
    component.valueMasked = '';
    component.blurInput();
    expect(component.valueMasked).toEqual('')
  });

  it('should test blurInput', () => {
    component.valueMasked = '02';
    component.blurInput();
    expect(component.valueMasked).toEqual('2.00');
  });

  it('should test blurInput', () => {
    component.valueMasked = ',02';
    component.blurInput();
    expect(component.valueMasked).toEqual('2.00');
  });


  it('should test blurInput', () => {
    component.config. readonly = true;
    component.valueMasked = ',02';
    component.blurInput();
    expect(component.valueMasked).toEqual(',02');
  });

});
