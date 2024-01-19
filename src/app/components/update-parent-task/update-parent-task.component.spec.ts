import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParentTaskComponent } from './update-parent-task.component';

describe('UpdateParentTaskComponent', () => {
  let component: UpdateParentTaskComponent;
  let fixture: ComponentFixture<UpdateParentTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateParentTaskComponent]
    });
    fixture = TestBed.createComponent(UpdateParentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
