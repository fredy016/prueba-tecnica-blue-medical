import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoOficialCrearComponent } from './auto-oficial-crear.component';

describe('AutoOficialCrearComponent', () => {
  let component: AutoOficialCrearComponent;
  let fixture: ComponentFixture<AutoOficialCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoOficialCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoOficialCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
