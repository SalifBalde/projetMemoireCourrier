import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieDouaneComponent } from './sortie-douane.component';

describe('SortieDouaneComponent', () => {
  let component: SortieDouaneComponent;
  let fixture: ComponentFixture<SortieDouaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortieDouaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortieDouaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
