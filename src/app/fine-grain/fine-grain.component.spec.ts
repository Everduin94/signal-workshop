import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineGrainComponent } from './fine-grain.component';

describe('FineGrainComponent', () => {
  let component: FineGrainComponent;
  let fixture: ComponentFixture<FineGrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FineGrainComponent]
    });
    fixture = TestBed.createComponent(FineGrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
