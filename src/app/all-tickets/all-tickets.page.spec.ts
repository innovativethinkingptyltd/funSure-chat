import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllTicketsPage } from './all-tickets.page';

describe('AllTicketsPage', () => {
  let component: AllTicketsPage;
  let fixture: ComponentFixture<AllTicketsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTicketsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllTicketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
