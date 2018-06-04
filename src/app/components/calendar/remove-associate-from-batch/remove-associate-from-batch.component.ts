import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BamUser } from '../../../models/bamuser.model';
import { UsersService } from '../../../services/users.service';
import { Batch } from '../../../models/batch.model';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-remove-associate-from-batch',
  templateUrl: './remove-associate-from-batch.component.html',
  styleUrls: ['./remove-associate-from-batch.component.css']
})

/**
 * Class for remove user table component
 * @author Patrick Kennedy | Batch: 1712-Steve
 * @author Shane Avery Sistoza | Batch: 1712-Steve
 * @batch 1712-Steve
 */
export class RemoveAssociateFromBatchComponent implements OnInit {
  currentBatch: Batch;

  associates: BamUser[];
  @Input() searchTerm: string;
  @Input() associateAlertType: string;
  @Input() associateAlertMessage: string;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(public usersService: UsersService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.currentBatch = this.sessionService.getSelectedBatch();
    this.usersService.getUsersInBatch(this.currentBatch.id).subscribe(users => this.associates = users);
  }

  /**
   * Removes an associate from the current batch.
   *
   * @param      {BamUser}  user    The associate to remove.
   */
  removeUser(user: BamUser) {
    let i = 0;
    for (const associate of this.associates) {
      if (associate.userId === user.userId) {
        this.usersService.removeUserFromBatch(associate.userId).subscribe(users => {
          this.associates = users;
          this.associateAlert('success', `Successfully removed ${user.firstName} ${user.lastName} from current batch.`);
        }, error => {
          this.associateAlert('danger', `Error: couldn't remove ${user.firstName} ${user.lastName} from current batch.`);
        });
        break;
      }
      i++;
    }
  }

  associateAlert(type, message) {
    this.notify.emit({type: type, message: message});
  }

}
