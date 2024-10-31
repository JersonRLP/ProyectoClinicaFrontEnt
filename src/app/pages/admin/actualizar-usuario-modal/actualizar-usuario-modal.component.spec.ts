import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUsuarioModalComponent } from './actualizar-usuario-modal.component';

describe('ActualizarUsuarioModalComponent', () => {
  let component: ActualizarUsuarioModalComponent;
  let fixture: ComponentFixture<ActualizarUsuarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarUsuarioModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarUsuarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
