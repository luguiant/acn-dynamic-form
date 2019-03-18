import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormPaddingComponent } from './form-padding.component';

describe('FormPaddingComponent', () => {
  let comp: FormPaddingComponent;
  let fixture: ComponentFixture<FormPaddingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPaddingComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    fixture = TestBed.createComponent(FormPaddingComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

});
