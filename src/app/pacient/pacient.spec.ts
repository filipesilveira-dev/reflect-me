import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientPage } from './pacient';

describe('Pacient', () => {
  let component: PacientPage;
  let fixture: ComponentFixture<PacientPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PacientPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
