import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourrierImportExpediComponent } from './courrier-import-expedi.component';

describe('CourrierImportExpediComponent', () => {
  let component: CourrierImportExpediComponent;
  let fixture: ComponentFixture<CourrierImportExpediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourrierImportExpediComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourrierImportExpediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
