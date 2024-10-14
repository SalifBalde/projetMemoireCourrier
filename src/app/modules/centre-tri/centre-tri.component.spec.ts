import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreTriComponent } from './centre-tri.component';

describe('CentreTriComponent', () => {
  let component: CentreTriComponent;
  let fixture: ComponentFixture<CentreTriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CentreTriComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
