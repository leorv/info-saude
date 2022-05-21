import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesTakenEditComponent } from './vaccines-taken-edit.component';

describe('VaccinesTakenEditComponent', () => {
  let component: VaccinesTakenEditComponent;
  let fixture: ComponentFixture<VaccinesTakenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinesTakenEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinesTakenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
