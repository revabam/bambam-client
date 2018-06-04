import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBatchComponent } from './edit-batch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import { UsersService } from '../../../services/users.service';
import { LocationStrategy } from '@angular/common';
import { convertToParamMap, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '../../../services/alert.service';
import { Batch } from '../../../models/batch.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BatchType } from '../../../models/batchtype.model';
import { UrlService } from '../../../services/url.service';

/**
 * @author David Graves
 * @batch 1712
 *
 * This particular component required specific dependencies that were different than other
 * components. So changes to the Dependencies class in TestModule and TestObservableModule will not
 * reflect here.
 *
 */
describe('EditBatchComponent', () => {
  let component: EditBatchComponent;
  let fixture: ComponentFixture<EditBatchComponent>;

  // Service spies for testing if a function has been called
  let alertServiceAlertSpy: jasmine.Spy;
  let batchServiceUpdateSpy: jasmine.Spy;
  let sessionServicePutSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatchComponent ],
      imports: [ HttpClientModule, RouterModule,
      RouterTestingModule.withRoutes([]) ],
      providers: [BatchService, SessionService, UsersService,
        LocationStrategy, AlertService, UrlService],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    // Get the services that need to be spied on
    const alertService: AlertService = TestBed.get(AlertService);
    const sessionService: SessionService = TestBed.get(SessionService);
    const batchService: BatchService = TestBed.get(BatchService);

    // Set spies that need to be referenced later
    alertServiceAlertSpy = spyOn(alertService, 'alert');
    batchServiceUpdateSpy = spyOn(batchService, 'updateBatch').and.callFake((batch: Batch) => {
      if (batch.id === 0) {
        return of('good');
      } else {
        return Observable.throw('bad');
      }
    });
    sessionServicePutSpy = spyOn(sessionService, 'putSelectedBatchIntoSession');

    // Create other spies
    spyOn(sessionService, 'getSelectedBatch').and.returnValue(new Batch(0, 'TestBatch', null, null, null, 0, 0));
    spyOn(batchService, 'getAllBatchTypes').and.returnValue(of(
      [
        new BatchType(0, 'Type 1', 1),
        new BatchType(1, 'Type 1', 2),
        new BatchType(2, 'Type 1', 3),
        new BatchType(3, 'Type 1', 4),
        new BatchType(4, 'Type 1', 5)
      ]
    ));

    fixture = TestBed.createComponent(EditBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should call alertService.alert', () => {
    component.batchAlert(null, null);
    expect(alertServiceAlertSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should call alertService.alert', () => {
    component.associateAlert({type: null, message: null});
    expect(alertServiceAlertSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set batch\'s end date to a provided date', () => {
    const newDate: Date = new Date();
    component.endDateChanged(newDate);
    expect(component.batch.endDate).toEqual(newDate);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set batch\'s start date to a provided date', () => {
    const newDate: Date = new Date();
    component.startDateChanged(newDate);
    expect(component.batch.startDate).toEqual(newDate);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set batch to batch received from sessionService, should set batchTypes to array received from batchService', () => {

    const expectedBatch: Batch = new Batch(0, 'TestBatch', null, null, null, 0, 0);

    const expectedArr: Array<BatchType> = [
      new BatchType(0, 'Type 1', 1),
      new BatchType(1, 'Type 1', 2),
      new BatchType(2, 'Type 1', 3),
      new BatchType(3, 'Type 1', 4),
      new BatchType(4, 'Type 1', 5)
    ];

    component.ngOnInit();

    fixture.whenStable().then( () => {
      expect(component.batch).toEqual(expectedBatch);
      expect(component.batchTypes).toEqual(expectedArr);
    });
  });

  /**
   * @author Holdn Olivier
   * @batch 1803 usf
   */
  it ('should call batchAlert and exit early if startDate is later than endDate', () => {
    spyOn(component, 'batchAlert');
    component.batch.startDate = new Date(14);
    component.batch.endDate = new Date(10);

    component.submit(0);

    expect(component.batchAlert).toHaveBeenCalled();
    expect(batchServiceUpdateSpy).not.toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should alert user of success and put selected batch into the session', () => {
    spyOn(component, 'batchAlert');

    component.batch.id = 0;
    component.batch.startDate = new Date(10);
    component.batch.endDate = new Date(14);

    component.submit(24);

    expect(component.batchAlert).toHaveBeenCalled();
    expect(batchServiceUpdateSpy).toHaveBeenCalled();
    expect(sessionServicePutSpy).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should alert user of failure', () => {
    spyOn(component, 'batchAlert');

    component.batch.id = 1;
    component.batch.startDate = new Date(10);
    component.batch.endDate = new Date(14);

    component.submit(2);

    expect(component.batchAlert).toHaveBeenCalled();
    expect(batchServiceUpdateSpy).toHaveBeenCalled();
    expect(sessionServicePutSpy).not.toHaveBeenCalled();
  });
});
