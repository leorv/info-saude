import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesDetailsComponent } from './vaccines-details.component';

describe('VaccinesDetailsComponent', () => {
  let component: VaccinesDetailsComponent;
  let fixture: ComponentFixture<VaccinesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
