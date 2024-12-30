import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCourrierComponent } from './service-courrier.component';

describe('ServiceCourrierComponent', () => {
  let component: ServiceCourrierComponent;
  let fixture: ComponentFixture<ServiceCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCourrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
