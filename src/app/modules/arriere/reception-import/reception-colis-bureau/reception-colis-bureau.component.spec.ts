import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionColisBureauComponent } from './reception-colis-bureau.component';

describe('ReceptionColisBureauComponent', () => {
  let component: ReceptionColisBureauComponent;
  let fixture: ComponentFixture<ReceptionColisBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionColisBureauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionColisBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
