import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyRegisterComponent } from './survey-register.component';

describe('SurveyRegisterComponent', () => {
  let component: SurveyRegisterComponent;
  let fixture: ComponentFixture<SurveyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
