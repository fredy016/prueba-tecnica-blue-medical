import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoResidenteCrearComponent } from './auto-residente-crear.component';

describe('AutoResidenteCrearComponent', () => {
  let component: AutoResidenteCrearComponent;
  let fixture: ComponentFixture<AutoResidenteCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoResidenteCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoResidenteCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
