import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourrierOrdinaireComponent } from './courrier-ordinaire.component';

describe('CourrierOrdinaireComponent', () => {
  let component: CourrierOrdinaireComponent;
  let fixture: ComponentFixture<CourrierOrdinaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourrierOrdinaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourrierOrdinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
