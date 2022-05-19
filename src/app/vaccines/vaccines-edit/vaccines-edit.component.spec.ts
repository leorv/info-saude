import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesEditComponent } from './vaccines-edit.component';

describe('VaccinesEditComponent', () => {
  let component: VaccinesEditComponent;
  let fixture: ComponentFixture<VaccinesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
