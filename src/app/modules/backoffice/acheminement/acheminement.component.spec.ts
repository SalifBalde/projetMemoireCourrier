import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheminementComponent } from './acheminement.component';

describe('AcheminementComponent', () => {
  let component: AcheminementComponent;
  let fixture: ComponentFixture<AcheminementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcheminementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcheminementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
