import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionCourrierImportComponent } from './expedition-courrier-import.component';

describe('ExpeditionCourrierImportComponent', () => {
  let component: ExpeditionCourrierImportComponent;
  let fixture: ComponentFixture<ExpeditionCourrierImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionCourrierImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionCourrierImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
