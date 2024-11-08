import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourrierValeurDeclareComponent } from './courrier-valeur-declare.component';

describe('CourrierValeurDeclareComponent', () => {
  let component: CourrierValeurDeclareComponent;
  let fixture: ComponentFixture<CourrierValeurDeclareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourrierValeurDeclareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourrierValeurDeclareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
