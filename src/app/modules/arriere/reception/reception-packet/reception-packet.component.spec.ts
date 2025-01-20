import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionPacketComponent } from './reception-packet.component';

describe('ReceptionPacketComponent', () => {
  let component: ReceptionPacketComponent;
  let fixture: ComponentFixture<ReceptionPacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionPacketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
