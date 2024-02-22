import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagefullComponent } from './imagefull.component';

describe('ImagefullComponent', () => {
  let component: ImagefullComponent;
  let fixture: ComponentFixture<ImagefullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagefullComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagefullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
