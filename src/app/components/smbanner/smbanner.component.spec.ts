import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmbannerComponent } from './smbanner.component';

describe('SmbannerComponent', () => {
  let component: SmbannerComponent;
  let fixture: ComponentFixture<SmbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmbannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
