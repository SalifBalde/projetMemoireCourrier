import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermetureCourrierBureauLivComponent } from './fermeture-courrier-bureau-liv.component';

describe('FermetureCourrierBureauLivComponent', () => {
  let component: FermetureCourrierBureauLivComponent;
  let fixture: ComponentFixture<FermetureCourrierBureauLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermetureCourrierBureauLivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermetureCourrierBureauLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
