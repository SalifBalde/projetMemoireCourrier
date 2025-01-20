import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermetureColisImportComponent } from './fermeture-colis-import.component';

describe('FermetureColisImportComponent', () => {
  let component: FermetureColisImportComponent;
  let fixture: ComponentFixture<FermetureColisImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermetureColisImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermetureColisImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
