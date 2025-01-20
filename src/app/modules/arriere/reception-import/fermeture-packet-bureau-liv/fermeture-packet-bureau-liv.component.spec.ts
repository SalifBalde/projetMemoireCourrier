import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermeturePacketBureauLivComponent } from './fermeture-packet-bureau-liv.component';

describe('FermeturePacketBureauLivComponent', () => {
  let component: FermeturePacketBureauLivComponent;
  let fixture: ComponentFixture<FermeturePacketBureauLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermeturePacketBureauLivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FermeturePacketBureauLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
