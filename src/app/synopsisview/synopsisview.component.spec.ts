import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynopsisviewComponent } from './synopsisview.component';

describe('SynopsisviewComponent', () => {
  let component: SynopsisviewComponent;
  let fixture: ComponentFixture<SynopsisviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynopsisviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynopsisviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
