import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoidsCourrierComponent } from './poids-courrier.component';

describe('PoidsCourrierComponent', () => {
  let component: PoidsCourrierComponent;
  let fixture: ComponentFixture<PoidsCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoidsCourrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoidsCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
