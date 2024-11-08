import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourrierRecommandeComponent } from './courrier-recommande.component';

describe('CourrierRecommandeComponent', () => {
  let component: CourrierRecommandeComponent;
  let fixture: ComponentFixture<CourrierRecommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourrierRecommandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourrierRecommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
