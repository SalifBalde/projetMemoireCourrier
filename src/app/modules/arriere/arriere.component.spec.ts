import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriereComponent } from './arriere.component';

describe('ArriereComponent', () => {
  let component: ArriereComponent;
  let fixture: ComponentFixture<ArriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArriereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
