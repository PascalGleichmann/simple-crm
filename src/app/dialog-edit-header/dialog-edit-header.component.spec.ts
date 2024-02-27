import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditHeaderComponent } from './dialog-edit-header.component';

describe('DialogEditHeaderComponent', () => {
  let component: DialogEditHeaderComponent;
  let fixture: ComponentFixture<DialogEditHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditHeaderComponent]
    });
    fixture = TestBed.createComponent(DialogEditHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
