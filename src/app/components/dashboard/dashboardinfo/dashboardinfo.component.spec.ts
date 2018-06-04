import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfoComponent } from './dashboardinfo.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { SessionService } from '../../../services/session.service';
import { BatchService } from '../../../services/batch.service';
import { Batch } from '../../../models/batch.model';
import { of } from 'rxjs/observable/of';
import { BamUser } from '../../../models/bamuser.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';



describe('DashboardInfoComponent', () => {
  let component: DashboardInfoComponent;
  let fixture: ComponentFixture<DashboardInfoComponent>;
  let batchService: BatchService;
  let sessionService: SessionService;
  let spy: any;
  const selectedSubject = new Subject<Batch>();
  const tempUser = new BamUser(2, 'TestF', 'TestM', 'TestL',
  'test@fake.email', 'password', 1, null, '123-456-7890',
  '098-765-4321', 'TestSkype', 'notPassword', 234);
  const batch2 = new Batch(123, 'batch', new Date('March 17, 2018 03:24:00'), new Date('May 27, 2018 03:24:00'), tempUser, 123, 123);

  // const batchSubject =  new Subject<Batch>();
  // batchSubject.next(batch2);

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    sessionService = TestBed.get(SessionService);
    batchService = TestBed.get(BatchService);
    TestBed.overrideProvider(SessionService, {useValue: sessionService});
    TestBed.overrideProvider(BatchService, {useValue: batchService});
    fixture = TestBed.createComponent(DashboardInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checking NgOnit function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('checking batchSubscribe function', () => {
    expect(component.batchSubscribe).toBeTruthy();
  });

  it('checking setProperties function', () => {
    expect(component.setProperties).toBeTruthy();
  });

  // checking ngOnInit
  it('should call ngOnInit', () => {
    spy = spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
 });

 // checks batchSubscribe

 it('checks batchSubscribe getBatchById == 123, checks batchObs = defined and setProperties = been called ', () => {

  spyOn(component, 'batchSubscribe').and.callThrough();
  spyOn(sessionService.selectedBatchSubject, 'subscribe').and.callFake( (nextFunc: (param: Batch) => void, errorFunc2?, completeFunc3?) => {
        nextFunc(batch2);
        return new Subscription(() => {});
    });
  spyOn(batchService, 'getBatchById').and.returnValues(Observable.of(batch2));
 // spyOn(batchService, 'getBatchById').and.returnValues(Observable.of(batch2));
  spyOn(component, 'setProperties').and.callThrough();

  component.batchSubscribe();
  fixture.detectChanges();
  expect(component.batchId).toBe(123);
  expect(component.batchObs).toBeDefined();
  expect(component.setProperties).toHaveBeenCalled();
});

// calls spy for setProperties
it('should call setProperties with the correct parameter batch2', () => {
  spyOn(component, 'setProperties').and.callThrough();
  component.setProperties(batch2);
  expect(component.setProperties).toHaveBeenCalled();
  expect(component.setProperties).toHaveBeenCalledWith(batch2);

});
  it('checks setProperties weeknum should be 8', () => {
    spyOn(component, 'setProperties').and.callThrough();
    batch2.startDate = new Date('March 17, 2018 03:24:00');
    batch2.endDate = new Date('May 27, 2018 03:24:00');
    component.setProperties(batch2);
    fixture.detectChanges();
    expect(component.weekNum).toBe(8);
  });

// time passed should be 11683474084 and weekNum = 0
it('checks setProperties weeknum shoulld be 0 ', () => {
  spyOn(component, 'setProperties').and.callThrough();
  batch2.startDate = new Date('May 17, 2018 03:24:00');
  batch2.endDate = new Date('April 27, 2018 03:24:00');
  component.setProperties(batch2);
  fixture.detectChanges();
  expect(component.weekNum).toBe(0);
  expect(component.weekNum).toBeDefined();
});

it('checks ngOnInit if getUser is called, user defined, batch defined, and setProperties and batchsubcribe called ', () => {
  spyOn(sessionService, 'getUser').and.returnValues(Observable.of(tempUser));
  spyOn(component, 'setProperties');
  const batchS = JSON.stringify(batch2);
  sessionStorage.setItem('batch', batchS);
  component.ngOnInit();
  fixture.detectChanges();
  expect(sessionService.getUser).toHaveBeenCalled();
  expect(component.setProperties).toHaveBeenCalled();
  sessionStorage.removeItem('batch');

});

});
