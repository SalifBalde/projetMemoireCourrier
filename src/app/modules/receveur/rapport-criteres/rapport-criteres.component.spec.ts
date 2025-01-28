import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportCriteresComponent } from './rapport-criteres.component';

describe('RapportCriteresComponent', () => {
  let component: RapportCriteresComponent;
  let fixture: ComponentFixture<RapportCriteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RapportCriteresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RapportCriteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
