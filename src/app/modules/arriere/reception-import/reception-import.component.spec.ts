import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionImportComponent } from './reception-import.component';

describe('ReceptionImportComponent', () => {
  let component: ReceptionImportComponent;
  let fixture: ComponentFixture<ReceptionImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceptionImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
