import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionArriereComponent } from './reception-arriere.component';

describe('ReceptionArriereComponent', () => {
  let component: ReceptionArriereComponent;
  let fixture: ComponentFixture<ReceptionArriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionArriereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionArriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
