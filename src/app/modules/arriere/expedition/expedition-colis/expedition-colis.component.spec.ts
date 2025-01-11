import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionColisComponent } from './expedition-colis.component';

describe('ExpeditionColisComponent', () => {
  let component: ExpeditionColisComponent;
  let fixture: ComponentFixture<ExpeditionColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionColisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
