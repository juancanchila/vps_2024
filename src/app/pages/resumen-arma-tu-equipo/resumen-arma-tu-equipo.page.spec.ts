import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResumenArmaTuEquipoPage } from './resumen-arma-tu-equipo.page';

describe('ResumenArmaTuEquipoPage', () => {
  let component: ResumenArmaTuEquipoPage;
  let fixture: ComponentFixture<ResumenArmaTuEquipoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenArmaTuEquipoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenArmaTuEquipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
