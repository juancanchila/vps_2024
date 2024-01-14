import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResumenDatosEnvioComprasPage } from './resumen-datos-envio-compras.page';

describe('ResumenDatosEnvioComprasPage', () => {
  let component: ResumenDatosEnvioComprasPage;
  let fixture: ComponentFixture<ResumenDatosEnvioComprasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenDatosEnvioComprasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenDatosEnvioComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
