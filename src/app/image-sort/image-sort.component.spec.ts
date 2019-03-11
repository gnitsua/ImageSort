import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSortComponent } from './image-sort.component';

describe('ImageSortComponent', () => {
  let component: ImageSortComponent;
  let fixture: ComponentFixture<ImageSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
