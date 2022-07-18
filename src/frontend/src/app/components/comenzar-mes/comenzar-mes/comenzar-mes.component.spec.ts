import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComenzarMesComponent } from './comenzar-mes.component';

describe('ComenzarMesComponent', () => {
  let component: ComenzarMesComponent;
  let fixture: ComponentFixture<ComenzarMesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComenzarMesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComenzarMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
