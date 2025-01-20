import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionLettreComponent } from './expedition-lettre.component';

describe('ExpeditionLettreComponent', () => {
  let component: ExpeditionLettreComponent;
  let fixture: ComponentFixture<ExpeditionLettreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpeditionLettreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpeditionLettreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
