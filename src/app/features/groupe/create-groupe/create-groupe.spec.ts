import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateGroupe} from './create-groupe';

describe('CreateGroupe', () => {
  let component: CreateGroupe;
  let fixture: ComponentFixture<CreateGroupe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGroupe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
