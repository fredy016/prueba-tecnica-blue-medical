import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoSalidaComponent } from './ingreso-salida.component';

describe('IngresoSalidaComponent', () => {
  let component: IngresoSalidaComponent;
  let fixture: ComponentFixture<IngresoSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoSalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
