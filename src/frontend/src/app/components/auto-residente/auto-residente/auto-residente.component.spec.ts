import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoResidenteComponent } from './auto-residente.component';

describe('AutoResidenteComponent', () => {
  let component: AutoResidenteComponent;
  let fixture: ComponentFixture<AutoResidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoResidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
