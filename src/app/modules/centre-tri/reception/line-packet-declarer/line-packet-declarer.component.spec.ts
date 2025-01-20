import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePacketDeclarerComponent } from './line-packet-declarer.component';

describe('LinePacketDeclarerComponent', () => {
  let component: LinePacketDeclarerComponent;
  let fixture: ComponentFixture<LinePacketDeclarerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinePacketDeclarerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinePacketDeclarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
