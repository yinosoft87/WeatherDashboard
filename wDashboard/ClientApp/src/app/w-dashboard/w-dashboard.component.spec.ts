import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WDashboardComponent } from './w-dashboard.component';

describe('WDashboardComponent', () => {
  let component: WDashboardComponent;
  let fixture: ComponentFixture<WDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
