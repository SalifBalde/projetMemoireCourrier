import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionCourrierBureauComponent } from './reception-courrier-bureau.component';

describe('ReceptionCourrierBureauComponent', () => {
  let component: ReceptionCourrierBureauComponent;
  let fixture: ComponentFixture<ReceptionCourrierBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionCourrierBureauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionCourrierBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
