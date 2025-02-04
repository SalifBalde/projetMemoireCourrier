import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeturePacketInterieurComponent } from './fermeture-packet-interieur.component';

describe('FermeturePacketInterieurComponent', () => {
  let component: FermeturePacketInterieurComponent;
  let fixture: ComponentFixture<FermeturePacketInterieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermeturePacketInterieurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermeturePacketInterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
