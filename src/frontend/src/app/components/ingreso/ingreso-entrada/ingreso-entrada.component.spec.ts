import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoEntradaComponent } from './ingreso-entrada.component';

describe('IngresoEntradaComponent', () => {
  let component: IngresoEntradaComponent;
  let fixture: ComponentFixture<IngresoEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
