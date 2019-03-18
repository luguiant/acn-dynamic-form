import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormRadioComponent } from './form-radio.component';

describe('FormRadioComponent', () => {
  let comp: FormRadioComponent;
  let fixture: ComponentFixture<FormRadioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRadioComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(FormRadioComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

});
