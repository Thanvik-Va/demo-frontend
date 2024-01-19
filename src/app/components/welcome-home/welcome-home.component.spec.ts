import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeHomeComponent } from './welcome-home.component';

describe('WelcomeHomeComponent', () => {
  let component: WelcomeHomeComponent;
  let fixture: ComponentFixture<WelcomeHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeHomeComponent]
    });
    fixture = TestBed.createComponent(WelcomeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
