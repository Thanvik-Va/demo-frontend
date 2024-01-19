import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarForOrgListComponent } from './nav-bar-for-org-list.component';

describe('NavBarForOrgListComponent', () => {
  let component: NavBarForOrgListComponent;
  let fixture: ComponentFixture<NavBarForOrgListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarForOrgListComponent]
    });
    fixture = TestBed.createComponent(NavBarForOrgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
