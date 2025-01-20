import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionPacketImportComponent } from './expedition-packet-import.component';

describe('ExpeditionPacketImportComponent', () => {
  let component: ExpeditionPacketImportComponent;
  let fixture: ComponentFixture<ExpeditionPacketImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionPacketImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionPacketImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
