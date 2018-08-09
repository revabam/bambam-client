import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoomComponent } from './boom.component';

describe('BoomComponent', () => {
  let component: BoomComponent;
  let fixture: ComponentFixture<BoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "boom works!"', () => {
    const boomElement: HTMLElement = fixture.nativeElement;
    expect(boomElement.textContent).toContain('boom works!');
  });

  it('should have <p> with "boom works!"', () => {
    const boomElement: HTMLElement = fixture.nativeElement;
    const p = boomElement.querySelector('p');
    expect (p.textContent).toContain('boom !');
  });
});
