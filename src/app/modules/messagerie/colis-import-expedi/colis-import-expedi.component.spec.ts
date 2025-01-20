import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisImportExpediComponent } from './colis-import-expedi.component';

describe('ColisImportExpediComponent', () => {
  let component: ColisImportExpediComponent;
  let fixture: ComponentFixture<ColisImportExpediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColisImportExpediComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColisImportExpediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
