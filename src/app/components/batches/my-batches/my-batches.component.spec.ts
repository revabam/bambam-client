import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

import { MyBatchesComponent } from './my-batches.component';
import { Dependencies } from '../../../bam.test.module';
import { filter } from 'rxjs/operators';
import { Batch } from '../../../models/batch.model';
import { BatchService } from '../../../services/batch.service';
import { SessionService } from '../../../services/session.service';
import { BamUser } from '../../../models/bamuser.model';
import { UsersService } from '../../../services/users.service';
import { CurriculumService } from '../../../services/curriculum.service';

import { Observable, of } from 'rxjs';
import { Curriculum } from '../../../models/curriculum.model';

describe('MyBatchesComponent', () => {
  let component: MyBatchesComponent;
  let fixture: ComponentFixture<MyBatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {

    // This creates instances of the services you intend to mock, with dependencies inected according to your TestBed's testing module.
    const sessionService: SessionService = TestBed.get(SessionService);
    const usersService: UsersService = TestBed.get(UsersService);
    const curriculumService: CurriculumService = TestBed.get(CurriculumService);
    const batchService: BatchService = TestBed.get(BatchService);

    const tempUser = new BamUser(2, 'TestF', 'TestM', 'TestL',
      'test@fake.email', 'password', 1, null, '123-456-7890',
      '098-765-4321', 'TestSkype', 'notPassword', 234);

    const tempBatch = new Batch(0, '', null, null, tempUser, 7, 29);
    tempBatch.trainerID = 7;

    const tempUserFunc = (userId: number) => {
      if (userId === 7) {
        return of(tempUser);
      } else {
        return Observable.throw(tempUser);
      }
    };

    const tempBatchFunc = (userId: number) => {
      if (userId === 7) {
        return of([tempBatch]);
      } else {
        return Observable.throw([tempBatch]);
      }
    };

    // This is where you overwrite the base functionality of your services using a Spy.and chain.
    // SpyOn(Service, 'Function').and.callFake(Function to use instead);
    spyOn(sessionService, 'getUser').and.returnValue(tempUser);

    spyOn(usersService, 'getUserByID').and.callFake(tempUserFunc);

    spyOn(batchService, 'getAllBatchesInProgress').and.callFake(tempBatchFunc);
    spyOn(batchService, 'getPastBatches').and.callFake(tempBatchFunc);
    spyOn(batchService, 'getFutureBatches').and.callFake(tempBatchFunc);

     // Or, if you only need it to return a spcific value
     // SpyOn(Service, 'Function').and.returnValue(Value that function should return when called);
    spyOn(curriculumService, 'getCurriculumById').and.returnValue(of(new Curriculum()));

    // Then you can proceed as normal, and your mocked functionality will be used automatically.
    fixture = TestBed.createComponent(MyBatchesComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author David Graves
   * @batch 1712
   * Tests if method is called when div is clicked on.
   */
  it('should call loadPast() when div is clicked', async(() => {
    spyOn(component, 'loadPast');

    const loadPastDiv = fixture.debugElement.query(By.css('#loadPast')).nativeElement;
    loadPastDiv.click();

    fixture.whenStable().then(() => {
      expect(component.loadPast).toHaveBeenCalled();
    });
  }));

  /**
   * @author David Graves
   * @batch 1712
   * Tests if method is called when div is clicked on.
   */
  it('should call loadCurrent() when div is clicked', async(() => {
    spyOn(component, 'loadCurrent');

    const loadCurrentDiv = fixture.debugElement.query(By.css('#loadCurrent')).nativeElement;
    loadCurrentDiv.click();

    fixture.whenStable().then(() => {
      expect(component.loadCurrent).toHaveBeenCalled();
    });
  }));

  /**
   * @author David Graves
   * @batch 1712
   * Tests if method is called when div is clicked on.
   */
  it('should call loadFuture() when div is clicked', async(() => {
    spyOn(component, 'loadFuture');

    const loadFutureDiv = fixture.debugElement.query(By.css('#loadFuture')).nativeElement;
    loadFutureDiv.click();

    fixture.whenStable().then(() => {
      expect(component.loadFuture).toHaveBeenCalled();
    });
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if setFilterText is called when the change event is fired.
   */
  it('should run setFilterText when a change is made to the filter text', async(() => {

    const filterElement = fixture.debugElement.query(By.css('.pull-right'));

    spyOn(component, 'setFilterText');

    filterElement.triggerEventHandler('change', 'This is a Unit Test');

    fixture.whenStable().then(() => {
      expect(component.setFilterText).toHaveBeenCalled();
    });
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if filterText is set to value of event target
   */
  it('should set filterText to "This is a Unit Test"', async(() => {

    const filterElement = fixture.debugElement.query(By.css('.pull-right')).nativeElement;

    filterElement.value = 'This is a Unit Test';

    const event = { target: filterElement };

    component.setFilterText(event);

    fixture.whenStable().then(() => {
      expect(component.filterText).toEqual('This is a Unit Test');
    });
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if setBatches properly handles invalid input of type undefined
   */
  it('should set batches to an empty array if input is undefined.', () => {
    component.setbatches(undefined);

    expect(component.batches).toEqual([]);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if setBatches properly handles invalid input of type null
   */
  it('should set batches to an empty array if input is null.', () => {
    component.setbatches(null);

    expect(component.batches).toEqual([]);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests that setBatches handles valid input as expected
   */
  it('should set batches equal to an input batch array.', () => {
    const batches: Array<Batch> = [
      new Batch(0, null, null, null, null, 7, 29),
      new Batch(5, null, null, null, null, 7, 31),
      new Batch(1, null, null, null, null, 7, 37),
      new Batch(3, null, null, null, null, 7, 41),
      new Batch(2, null, null, null, null, 7, 47),
    ];
    component.setbatches(batches);

    expect(component.batches).toEqual(batches);
  });

  /**
  * @author Holden Olivier
  * @batch 1803 usf
  * Tests that a batch's trainer is set to null on error
  */
  it ('should set batch trainer to null if usersService returns an error', () => {
    const tempUser: BamUser = new BamUser(0, '', '', '', '', '', 0, null, '' , '', '', '', 0);
    const batches: Array<Batch> = [
    new Batch(0, '', null, null, tempUser, 11, 29),
    new Batch(5, '', null, null, tempUser, 11, 31),
    new Batch(1, '', null, null, tempUser, 11, 37),
    new Batch(3, '', null, null, tempUser, 11, 41),
    new Batch(2, '', null, null, tempUser, 11, 47),
    ];

    component.setbatches(batches);

    expect(component.batches[1].trainer).toBeNull();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if loadCurrent sets batches to the array returned by the batchService
   */
  it('should set batches to an array with one batch in it', async( () => {
    component.userId = 7;
    component.loadCurrent();

    const tempUser = new BamUser(2, 'TestF', 'TestM', 'TestL',
    'test@fake.email', 'password', 1, null, '123-456-7890',
    '098-765-4321', 'TestSkype', 'notPassword', 234);

    const expected = [new Batch(0, '', null, null, tempUser, 7, 29)];
    expected[0].curriculum = undefined;
    expected[0].trainerID = 7;

    expect(component.batches).toEqual(expected);
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if loadPast sets batches to the array returned by the batchService
   */
  it('should set batches to an array with one batch in it', async( () => {
    component.userId = 7;
    component.loadPast();

    const tempUser = new BamUser(2, 'TestF', 'TestM', 'TestL',
    'test@fake.email', 'password', 1, null, '123-456-7890',
    '098-765-4321', 'TestSkype', 'notPassword', 234);

    const expected = [new Batch(0, '', null, null, tempUser, 7, 29)];
    expected[0].curriculum = undefined;
    expected[0].trainerID = 7;

    expect(component.batches).toEqual(expected);
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if loadFuture sets batches to the array returned by the batchService
   */
  it('should set batches to an array with one batch in it', async( () => {
    component.userId = 7;
    component.loadFuture();

    const tempUser = new BamUser(2, 'TestF', 'TestM', 'TestL',
    'test@fake.email', 'password', 1, null, '123-456-7890',
    '098-765-4321', 'TestSkype', 'notPassword', 234);

    const expected = [new Batch(0, '', null, null, tempUser, 7, 29)];
    expected[0].curriculum = undefined;
    expected[0].trainerID = 7;

    console.log(component.batches);
    console.log(expected);

    expect(component.batches).toEqual(expected);
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if loadCurrent sets batches to the array returned by the batchService
   */
  it('should set batches to an empty array when loadCurrent receives an error observable', async( () => {
    component.userId = 0;
    component.loadCurrent();

    const expected = [];

    expect(component.batches).toEqual(expected);
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if loadPast sets batches to the array returned by the batchService
   */
  it('should set batches to an empty array when loadPast receives an error observable', async( () => {
    component.userId = 0;
    component.loadPast();

    const expected = [];

    expect(component.batches).toEqual(expected);
  }));

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Tests if loadFuture sets batches to the array returned by the batchService
   */
  it('should set batches to an empty array when loadFuture receives an error observable', async( () => {
    component.userId = 0;
    component.loadFuture();

    const expected = [];

    expect(component.batches).toEqual(expected);
  }));
});
