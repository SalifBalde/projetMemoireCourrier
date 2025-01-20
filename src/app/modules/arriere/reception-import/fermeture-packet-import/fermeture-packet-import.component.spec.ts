import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeturePacketImportComponent } from './fermeture-packet-import.component';

describe('FermeturePacketImportComponent', () => {
  let component: FermeturePacketImportComponent;
  let fixture: ComponentFixture<FermeturePacketImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermeturePacketImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermeturePacketImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
