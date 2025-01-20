import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionPacketBureauLivComponent } from './reception-packet-bureau-liv.component';

describe('ReceptionPacketBureauLivComponent', () => {
  let component: ReceptionPacketBureauLivComponent;
  let fixture: ComponentFixture<ReceptionPacketBureauLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionPacketBureauLivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionPacketBureauLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
