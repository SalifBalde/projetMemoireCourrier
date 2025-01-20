import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermetureColisBureauLivComponent } from './fermeture-colis-bureau-liv.component';

describe('FermetureColisBureauLivComponent', () => {
  let component: FermetureColisBureauLivComponent;
  let fixture: ComponentFixture<FermetureColisBureauLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermetureColisBureauLivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermetureColisBureauLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
