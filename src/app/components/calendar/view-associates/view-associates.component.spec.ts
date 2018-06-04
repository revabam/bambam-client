import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAssociatesComponent } from './view-associates.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test-observable.module';
import { SessionService } from '../../../services/session.service';
import { UsersService } from '../../../services/users.service';
import { BamUser } from '../../../models/bamuser.model';
import { Batch } from '../../../models/batch.model';
import { Observable, of } from 'rxjs';

describe('ViewAssociatesComponent', () => {
  let component: ViewAssociatesComponent = null;
  let fixture: ComponentFixture<ViewAssociatesComponent>;

  // Boolean to control what a spy will return
  let returnNull = false;

  // Spies on services that need to be referenced later
  let usersServiceGetUsersSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {

    fixture = TestBed.createComponent(ViewAssociatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Get the services that will need to be spied on
    const sessionService: SessionService = TestBed.get(SessionService);
    const userService: UsersService = TestBed.get(UsersService);

    // Create spies that need to be referenced later
    usersServiceGetUsersSpy = spyOn(userService, 'getUsersInBatch').and.returnValue(
      of([new BamUser(55732, null, null, null, null, null, 0, null, null, null, null, null, 0)]));


    // Create other spies
    spyOn(sessionService, 'getSelectedBatch').and.callFake( () => {
       if (returnNull) {
        return null;
      } else {
        return new Batch(1, null, null, null, null, 0, 0);
      }
    }
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should call loadAssociates', () => {
    spyOn(component, 'loadAssociates');
    component.ngOnInit();
    expect(component.loadAssociates).toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should get the batch from sessionService, then get the assosciate list for that batch', () => {
    const expectedArr: Array<BamUser> = [new BamUser(55732, null, null, null, null, null, 0, null, null, null, null, null, 0)];
    returnNull = false;

    component.loadAssociates();

    expect(component.associateList).toEqual(expectedArr);
    expect(component.currentBatch).toEqual(new Batch(1, null, null, null, null, 0, 0));
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set current batch to null if there is no selected batch, then do nothing', () => {
    component.currentBatch = null;
    returnNull = true;

    component.loadAssociates();

    expect(component.currentBatch).toEqual(null);
    expect(usersServiceGetUsersSpy).not.toHaveBeenCalled();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should set order to the provided value', () => {
    component.reverse = false;
    this.order = 'notReversed';
    component.setOrder('Test');

    expect(component.order).toEqual('Test');
    expect(component.reverse).toEqual(false);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   */
  it ('should invert the value of reverse if the order is already equal to the provided value', () => {
    component.order = 'Test';
    component.reverse = false;
    component.setOrder('Test');

    expect(component.order).toEqual('Test');
    expect(component.reverse).toEqual(true);
  });
});
