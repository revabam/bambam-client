import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../bam.test-observable.module';
import { BamUser } from '../../models/bamuser.model';
import { SessionService } from '../../services/session.service';
import { Observable, of } from 'rxjs';
import { HomeUtil } from './home-test.util';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const user: BamUser = HomeUtil.getUserById(2);

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  /**
   * @author Craig Koepele | 1803-mar05-usf-java
   * Initialize the spies, using the util class to create mock data. The services should return
   * the mockdata provided when the specified function is called
   */
  beforeEach(() => {
    const sessionService: SessionService = TestBed.get(SessionService);

    spyOn(sessionService, 'putUserInSession').and.returnValue(of(user));

    TestBed.overrideProvider(SessionService, { useValue: sessionService });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Tests if the component is created
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Tests if the user component will return a BamUser observable when the
   * "putUserInSession" function is called.
   */
  it('home should get get a BamUser', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.currentUser).toEqual(user);
  });
});
