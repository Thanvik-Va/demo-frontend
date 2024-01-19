import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSelectComponentComponent } from './org-select-component.component';

describe('OrgSelectComponentComponent', () => {
  let component: OrgSelectComponentComponent;
  let fixture: ComponentFixture<OrgSelectComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrgSelectComponentComponent]
    });
    fixture = TestBed.createComponent(OrgSelectComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
