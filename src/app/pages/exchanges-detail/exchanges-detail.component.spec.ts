import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesDetailComponent } from './exchanges-detail.component';

describe('ExchangesDetailComponent', () => {
  let component: ExchangesDetailComponent;
  let fixture: ComponentFixture<ExchangesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
