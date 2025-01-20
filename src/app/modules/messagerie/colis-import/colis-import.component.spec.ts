import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisImportComponent } from './colis-import.component';

describe('ColisImportComponent', () => {
  let component: ColisImportComponent;
  let fixture: ComponentFixture<ColisImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColisImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColisImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
