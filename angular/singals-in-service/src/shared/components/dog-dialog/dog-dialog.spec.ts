import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogDialog } from './dog-dialog';

describe('DogDialog', () => {
  let component: DogDialog;
  let fixture: ComponentFixture<DogDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
