import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceBureauComponent } from './distance-bureau.component';

describe('DistanceBureauComponent', () => {
  let component: DistanceBureauComponent;
  let fixture: ComponentFixture<DistanceBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DistanceBureauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistanceBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
