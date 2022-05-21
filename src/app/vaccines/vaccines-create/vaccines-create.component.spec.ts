import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesCreateComponent } from './vaccines-create.component';

describe('VaccinesCreateComponent', () => {
  let component: VaccinesCreateComponent;
  let fixture: ComponentFixture<VaccinesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
