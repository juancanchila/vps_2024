import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResumenOtrosRestaurantesPage } from './resumen-otros-restaurantes.page';

describe('ResumenOtrosRestaurantesPage', () => {
  let component: ResumenOtrosRestaurantesPage;
  let fixture: ComponentFixture<ResumenOtrosRestaurantesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenOtrosRestaurantesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumenOtrosRestaurantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
