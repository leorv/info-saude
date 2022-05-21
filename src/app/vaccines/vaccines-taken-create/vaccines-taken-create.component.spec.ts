import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesTakenCreateComponent } from './vaccines-taken-create.component';

describe('VaccinesTakenCreateComponent', () => {
  let component: VaccinesTakenCreateComponent;
  let fixture: ComponentFixture<VaccinesTakenCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinesTakenCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinesTakenCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
