import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { SessionService } from '../../../services/session.service';
import { BatchService } from '../../../services/batch.service';
import { DebugElement } from '@angular/core';
import { BamUser } from '../../../models/bamuser.model';
import { UsersService } from '../../../services/users.service';
import { Observable, of, Subscription } from 'rxjs';
import { Batch } from '../../../models/batch.model';
import { and } from '@angular/router/src/utils/collection';




xdescribe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let batchService: BatchService;
  let sessionService: SessionService;
  let usersService: UsersService;
  const tempUser = new BamUser(2, 'TestF', 'TestM', 'TestL',
  'test@fake.email', 'password', 1, null, '123-456-7890',
  '098-765-4321', 'TestSkype', 'notPassword', 234);
  const batch1 = new Batch(123, 'batch', new Date('March 17, 2018 03:24:00'), new Date('May 27, 2018 03:24:00'), tempUser, 123, 123);
  const batch2 = new Batch(123, 'batch', new Date('March 17, 2018 03:24:00'), new Date('May 27, 2018 03:24:00'), tempUser, 123, 123);
  const batch3 = new Batch(321, 'batch', new Date('March 17, 2018 03:24:00'), new Date('May 27, 2018 03:24:00'), tempUser, 123, 123);

  TestBed.overrideProvider(SessionService, {useValue: sessionService});
  TestBed.overrideProvider(UsersService, {useValue: usersService});

      beforeEach(async(() => {
        TestBed.configureTestingModule(Dependencies).compileComponents();
      }), 1440000);

      beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        sessionService = TestBed.get(SessionService);
        usersService = TestBed.get(UsersService);
        batchService = TestBed.get(BatchService);


        // batchServiceMock = {
        //   isLoggedIn: true,
        //   user: { name: 'Test User'}
        // };

        // inject the service
          // spyOn(sessionService, 'getUser').and.returnValue(new BamUser(1, '', '', '', '', '', 0, null, '', '', '', '', 1));
          // spyOn(usersService, 'getUserByID').and.returnValue(Observable.of(new BamUser(2, 'TestF', 'TestM', 'TestL',
          // 'test@fake.email', 'password', 1, null, '123-456-7890', '098-765-4321', 'TestSkype', 'notPassword', 234)));
  });


  // checks each function if active
  it('checking NgOnit function', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

  it('checking getInProgressBatches function', () => {
    expect(component.getInProgressBatches).toBeTruthy();
  });

  it('checking setSelected function', () => {
    expect(component.setSelected).toBeTruthy();
  });

  it('checking setAllneededVars function', () => {
    expect(component.setAllneededVars).toBeTruthy();
  });

  it('checking compareBatch function', () => {
    expect(component.compareBatch).toBeTruthy();
  });

  // NGOnit testing bam user from NgOnit
  it('testing getUser = tempUser, getselectedbatch = batch, and services called in NgOnit', () => {
    spyOn (sessionService, 'getUser').and.returnValue(tempUser);
    spyOn (sessionService, 'getSelectedBatch').and.returnValue(batch2);
    spyOn (sessionService, 'putSelectedBatchIntoSession').and.callThrough();
    spyOn(component, 'getInProgressBatches').and.callThrough();
    component.ngOnInit();
    expect(component.currentUser).toEqual(tempUser);
    expect(sessionService.getSelectedBatch).toBeTruthy();
    expect(component.selectedBatch).toEqual(batch2);
    expect(sessionService.putSelectedBatchIntoSession).toHaveBeenCalled();
    expect(component.getInProgressBatches).toHaveBeenCalled();
  });


// checks getInProgressBatches method
it('checks getInProgressBatches bataches defined', () => {
 spyOn(batchService, 'getBatchAll').and.returnValues(of(batch2), of(batch3));
 spyOn(component, 'setAllneededVars').and.returnValue(of(batch2));
  component.getInProgressBatches();
  fixture.detectChanges();
  expect(component.batches).toBeDefined();
});

// checks getInProgressBatches method
it('checks getInProgressBatches batchCount defined' , () => {
  spyOn(component, 'setAllneededVars').and.callThrough();
   component.batches = [];
   component.batches [0] = batch1;
   component.batches [1] = batch2;
   component.batches [2] = batch3;
   component.getInProgressBatches();
   fixture.detectChanges();
   console.log('batch length = ' + component.batches.length);
   console.log('batccount = ' + component.batchCount);
   console.log('batches = ' + component.batches);
   expect(component.batchCount).toBeDefined();
   expect(component.setAllneededVars).toHaveBeenCalled();

 });

// checks setSelected method
it('checking setSelected if sessionService is called ', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession').and.callThrough();
  component.selectedBatch = batch2;
  component.setSelected();
  expect(sessionService.putSelectedBatchIntoSession).toHaveBeenCalled();
});

it('checking sessionService stores batch', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession').and.callThrough();
  sessionService.putSelectedBatchIntoSession(batch2);
  expect(batch2).toEqual(sessionService.getSelectedBatch());
});



// checking setAllneededVars method
it('checks when batchCount is zero message is apporiate', () => {
  spyOn (component, 'setAllneededVars').and.callThrough();
  const batchCount = 0;
  component.setAllneededVars();
  fixture.detectChanges();
  component = fixture.componentInstance;
  expect(component.message).toEqual('You have no current batches');
});

it('checks when batchCount is 2 message is apporiate', () => {
  spyOn (component, 'setAllneededVars').and.callThrough();
  const batchCount = 2;
  component.setAllneededVars();
  fixture.detectChanges();
  component = fixture.componentInstance;
  expect(component.message).toEqual('You have more than one current batch');
});

it('checkis if batchcount = 1 then to have putSelectedBatchIntoSession to be called ', () => {
  spyOn (sessionService, 'putSelectedBatchIntoSession').and.callThrough();
  const batchCount = 1;
  component.setAllneededVars();
  fixture.detectChanges();
  component = fixture.componentInstance;
  expect(sessionService.putSelectedBatchIntoSession).toHaveBeenCalled();
});

// checks compareBatch method
it('checks that batch1 and batch are equal they are', () => {
spyOn (component, 'compareBatch').and.callThrough();
expect(component.compareBatch(batch1, batch2)).toBe(true);
});

it('checks that batch3 and batch are equal they are not', () => {
  spyOn (component, 'compareBatch').and.callThrough();
  expect(component.compareBatch(batch2, batch3)).toBe(false);
  });
});
