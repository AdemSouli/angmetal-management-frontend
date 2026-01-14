import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuetosComponent } from './quetos.component';

describe('QuetosComponent', () => {
  let component: QuetosComponent;
  let fixture: ComponentFixture<QuetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuetosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
