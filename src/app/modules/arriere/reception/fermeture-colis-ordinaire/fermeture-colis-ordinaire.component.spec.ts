import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermetureColisOrdinaireComponent } from './fermeture-colis-ordinaire.component';

describe('FermetureColisOrdinaireComponent', () => {
  let component: FermetureColisOrdinaireComponent;
  let fixture: ComponentFixture<FermetureColisOrdinaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermetureColisOrdinaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermetureColisOrdinaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
