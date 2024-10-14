import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsExpeditionComponent } from './details-expedition.component';

describe('DetailsExpeditionComponent', () => {
  let component: DetailsExpeditionComponent;
  let fixture: ComponentFixture<DetailsExpeditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsExpeditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
