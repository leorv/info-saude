import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesListByStudentComponent } from './vaccines-list-by-student.component';

describe('VaccinesListByStudentComponent', () => {
  let component: VaccinesListByStudentComponent;
  let fixture: ComponentFixture<VaccinesListByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinesListByStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinesListByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
