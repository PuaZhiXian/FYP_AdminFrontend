import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCollectionComponent } from './api-collection.component';

describe('ApiCollectionComponent', () => {
  let component: ApiCollectionComponent;
  let fixture: ComponentFixture<ApiCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
