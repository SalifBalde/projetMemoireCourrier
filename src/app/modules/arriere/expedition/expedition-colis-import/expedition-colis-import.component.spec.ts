import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionColisImportComponent } from './expedition-colis-import.component';

describe('ExpeditionColisImportComponent', () => {
  let component: ExpeditionColisImportComponent;
  let fixture: ComponentFixture<ExpeditionColisImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionColisImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionColisImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
