import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionArriereComponent } from './expedition-arriere.component';

describe('ExpeditionArriereComponent', () => {
  let component: ExpeditionArriereComponent;
  let fixture: ComponentFixture<ExpeditionArriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionArriereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionArriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
