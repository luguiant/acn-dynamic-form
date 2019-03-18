import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTooltipComponent } from './form-tooltip.component';

describe('FormTooltipComponent', () => {
  let component: FormTooltipComponent;
  let fixture: ComponentFixture<FormTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTooltipComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
