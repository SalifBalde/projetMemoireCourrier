import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourrierImportRcepComponent } from './courrier-import-rcep.component';

describe('CourrierImportRcepComponent', () => {
  let component: CourrierImportRcepComponent;
  let fixture: ComponentFixture<CourrierImportRcepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourrierImportRcepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourrierImportRcepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
