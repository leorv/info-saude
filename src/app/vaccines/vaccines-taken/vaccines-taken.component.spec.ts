import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesTakenComponent } from './vaccines-taken.component';

describe('VaccinesTakenComponent', () => {
  let component: VaccinesTakenComponent;
  let fixture: ComponentFixture<VaccinesTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinesTakenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinesTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
