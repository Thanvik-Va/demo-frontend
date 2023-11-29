import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderCardsComponent } from './folder-cards.component';

describe('FolderCardsComponent', () => {
  let component: FolderCardsComponent;
  let fixture: ComponentFixture<FolderCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FolderCardsComponent]
    });
    fixture = TestBed.createComponent(FolderCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
