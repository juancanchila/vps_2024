import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialSolicitudesResumenPage } from './historial-solicitudes-resumen.page';

describe('HistorialSolicitudesResumenPage', () => {
  let component: HistorialSolicitudesResumenPage;
  let fixture: ComponentFixture<HistorialSolicitudesResumenPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialSolicitudesResumenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialSolicitudesResumenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
