import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormLabelComponent } from '../form-label/form-label.component';

describe('FormLabelComponent', () => {
  let comp: FormLabelComponent;
  let fixture: ComponentFixture<FormLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLabelComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(FormLabelComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

});
