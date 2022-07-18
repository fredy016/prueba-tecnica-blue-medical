import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCobroResidentesComponent } from './informe-cobro-residentes.component';

describe('InformeCobroResidentesComponent', () => {
  let component: InformeCobroResidentesComponent;
  let fixture: ComponentFixture<InformeCobroResidentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeCobroResidentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeCobroResidentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
