import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionColisImportComponent } from './reception-colis-import.component';

describe('ReceptionColisImportComponent', () => {
  let component: ReceptionColisImportComponent;
  let fixture: ComponentFixture<ReceptionColisImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionColisImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionColisImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
