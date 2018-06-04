import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAssociateFromBatchComponent } from './remove-associate-from-batch.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../../bam.test.module';
import { SearchPipe } from '../../../pipes/search.pipe';
import { UsersService } from '../../../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { Batch } from '../../../models/batch.model';
import { BamUser } from '../../../models/bamuser.model';
import { SessionService } from '../../../services/session.service';
import { BatchType } from '../../../models/batchtype.model';
import { Observable, of } from 'rxjs';

describe('RemoveAssociateFromBatchComponent', () => {
  let component: RemoveAssociateFromBatchComponent;
  let fixture: ComponentFixture<RemoveAssociateFromBatchComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }));

  beforeEach(() => {

    // Get instances of services that need to be mocked
    const sessionService: SessionService = TestBed.get(SessionService);
    const usersService: UsersService = TestBed.get(UsersService);

    // Create spies
    // sessionService.getSelectedBatch(): Batch
    spyOn(sessionService, 'getSelectedBatch').and.returnValue(new Batch(1, null, null, null, null, 0, 0));
    // usersService.getUsersInBatch(number): Observable<Array<BamUser>>
    spyOn(usersService, 'getUsersInBatch').and.returnValue(of(
      [
        new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
        new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
      ]));
    // usersService.removeUserFromBatch(number): Observable<Array<BamUser>>
    spyOn(usersService, 'removeUserFromBatch').and.callFake((userId: number) => {
      if (userId === 0) {
        return of([
          new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
          new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
          new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
          new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
          new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
        ]);
      } else {
        return Observable.throw('Test');
      }
    });

    fixture = TestBed.createComponent(RemoveAssociateFromBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Testing RemoveAssociateFromBatchComponent.associateAlert()
   */
  it ('should emit an event with the type and message provided to associateAlert', (done) => {
    // Prepare to receive event
    component.notify.subscribe((event) => {
      // check for expectations when event is emitted
      expect(event.type).toEqual('Test');
      expect(event.message).toEqual('This is a test.');
      // test complete
      done();
    });

    // Call function
    component.associateAlert('Test', 'This is a test.');
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Testing RemoveAssociateFromBatchComponent.removeUser() 1
   *  Test case: Remove user at index 0
   */
  it ('should tell the usersService to remove the user with the given user\'s id from the \
  batch, then set associates to the updated user list and notify the user if successful', () => {
    // Generate expectations
    const expectedArr = [
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    // Create spy
    spyOn(component, 'associateAlert');

    // Set starting values
    component.associates = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    // Call function
    component.removeUser(new BamUser(0, 'Test', null, 'User', null, null, 0, null, null, null, null, null, 0));

    // Check for expectations
    expect(component.associateAlert).toHaveBeenCalledWith('success', `Successfully removed Test User from current batch.`);
    expect(component.associates).toEqual(expectedArr);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Testing RemoveAssociateFromBatchComponent.removeUser() 2
   *  Test case: Observable throws error
   */
  it ('should leave associates unchanged and alert user of failure if the given user cannot be removed from a batch', () => {
    // Generate expectations
    const expectedArr = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    // Create spy
    spyOn(component, 'associateAlert');

    // Set starting values
    component.associates = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    // Call function
    component.removeUser(new BamUser(1, 'Test', null, 'User', null, null, 0, null, null, null, null, null, 0));

    // Check for expectations
    expect(component.associateAlert).toHaveBeenCalledWith('danger', `Error: couldn't remove Test User from current batch.`);
    expect(component.associates).toEqual(expectedArr);
  });

  /**
   * @author Holden Olivier
   * @batch 1803 usf
   * Testing RemoveAssociateFromBatchComponent.removeUser() 3
   *  Test case: Remove user not with Id not matching any user in array
   */
  it ('should do nothing if no match is found', () => {
    // Generate Expectations
    const expectedArr = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    // Create spy
    spyOn(component, 'associateAlert');

    // Set starting values
    component.associates = [
      new BamUser(0, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(1, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(2, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(3, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(4, null, null, null, null, null, 0, null, null, null, null, null, 0),
      new BamUser(5, null, null, null, null, null, 0, null, null, null, null, null, 0),
    ];

    // Call function
    component.removeUser(new BamUser(7, 'Test', null, 'User', null, null, 0, null, null, null, null, null, 0));

    // Check for expectations
    expect(component.associateAlert).not.toHaveBeenCalled();
    expect(component.associates).toEqual(expectedArr);
  });

});
