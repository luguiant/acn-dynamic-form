import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormButtonComponent } from './form-button.component';

describe('FormButtonComponent', () => {
  let comp: FormButtonComponent;
  let fixture: ComponentFixture<FormButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FormButtonComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(FormButtonComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });



});
