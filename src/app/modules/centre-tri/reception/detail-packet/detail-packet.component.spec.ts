import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPacketComponent } from './detail-packet.component';

describe('DetailPacketComponent', () => {
  let component: DetailPacketComponent;
  let fixture: ComponentFixture<DetailPacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPacketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
