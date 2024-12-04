import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCourrierComponent } from './type-courrier.component';

describe('TypeCourrierComponent', () => {
  let component: TypeCourrierComponent;
  let fixture: ComponentFixture<TypeCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeCourrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
