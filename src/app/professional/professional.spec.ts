import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalPage } from './professional';

describe('Professional', () => {
  let component: ProfessionalPage;
  let fixture: ComponentFixture<ProfessionalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
