import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionLinePacketComponent } from './reception-line-packet.component';

describe('ReceptionLinePacketComponent', () => {
  let component: ReceptionLinePacketComponent;
  let fixture: ComponentFixture<ReceptionLinePacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionLinePacketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionLinePacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
