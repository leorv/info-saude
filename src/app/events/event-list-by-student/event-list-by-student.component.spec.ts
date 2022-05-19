import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListByStudentComponent } from './event-list-by-student.component';

describe('EventListByStudentComponent', () => {
  let component: EventListByStudentComponent;
  let fixture: ComponentFixture<EventListByStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListByStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListByStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
