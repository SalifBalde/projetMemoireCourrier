import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermetureLettreInterieurComponent } from './fermeture-lettre-interieur.component';

describe('FermetureLettreInterieurComponent', () => {
  let component: FermetureLettreInterieurComponent;
  let fixture: ComponentFixture<FermetureLettreInterieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermetureLettreInterieurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermetureLettreInterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
