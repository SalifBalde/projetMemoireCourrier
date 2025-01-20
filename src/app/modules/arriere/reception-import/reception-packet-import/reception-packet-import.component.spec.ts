import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionPacketImportComponent } from './reception-packet-import.component';

describe('ReceptionPacketImportComponent', () => {
  let component: ReceptionPacketImportComponent;
  let fixture: ComponentFixture<ReceptionPacketImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionPacketImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionPacketImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
