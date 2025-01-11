import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionColisComponent } from './reception-colis.component';

describe('ReceptionColisComponent', () => {
  let component: ReceptionColisComponent;
  let fixture: ComponentFixture<ReceptionColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionColisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
