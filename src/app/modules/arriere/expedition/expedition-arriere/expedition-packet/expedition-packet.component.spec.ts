import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionPacketComponent } from './expedition-packet.component';

describe('ExpeditionPacketComponent', () => {
  let component: ExpeditionPacketComponent;
  let fixture: ComponentFixture<ExpeditionPacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionPacketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
