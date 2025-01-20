import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermetureCourrierImportComponent } from './fermeture-courrier-import.component';

describe('FermetureCourrierImportComponent', () => {
  let component: FermetureCourrierImportComponent;
  let fixture: ComponentFixture<FermetureCourrierImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermetureCourrierImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermetureCourrierImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
