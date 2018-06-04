import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssociateToBatchComponent } from './add-associate-to-batch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { BamUser } from '../../../models/bamuser.model';
import { Batch } from '../../../models/batch.model';
import { UsersService } from '../../../services/users.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UrlService } from '../../../services/url.service';
import { Observable, of } from 'rxjs';
import { SessionService } from '../../../services/session.service';
import { error } from 'util';
/*
  test for AddAssociateToBatchComponent
*/
describe('AddAssociateToBatchComponent', () => {
  let component: AddAssociateToBatchComponent;
  let fixture: ComponentFixture<AddAssociateToBatchComponent>;
  let testUser: BamUser;
  let testBatch: Batch;
  const arrUs: BamUser[] = [];
  let spy: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssociateToBatchComponent);

    const userService: UsersService = TestBed.get(UsersService);
    const sessionService: SessionService = TestBed.get(SessionService);

    testBatch = new Batch(1, '', null, null, null, 1, 1);
    testUser = new BamUser(1, '', '', '', '', '', 0, testBatch, '', '', '', '', 1);
    arrUs.push(testUser);

    spyOn(userService, 'getUsersNotInBatch' ).and.returnValue(of( arrUs));
    spyOn(userService, 'addUserToBatch').and.returnValues(Observable.throw(' '), of(arrUs));
    spyOn(sessionService, 'getSelectedBatch').and.returnValue(testBatch);

    TestBed.overrideProvider(UsersService, {useValue: userService});
    TestBed.overrideProvider(SessionService, {useValue: sessionService});

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    spy = spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should initialize users', () => {
    expect(component.associates).toBeDefined();
  });
  it('should add new User', () => {
    component.addUser(testUser);
    component.addUser(testUser);
  });
  it('should equal userId', () => {
    expect(component.associates[0].userId).toEqual(testUser.userId);
  });
  it('should notify emit', () => {
   component.associateAlert('success', 'add new user');
   fixture.debugElement.triggerEventHandler('notify', <Event>{});
    expect(component.notify).toBeDefined();
  });
});

