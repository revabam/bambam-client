import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BamUser } from '../../../models/bamuser.model';
import { UsersService } from '../../../services/users.service';
import { Batch } from '../../../models/batch.model';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-add-associate-to-batch',
  templateUrl: './add-associate-to-batch.component.html',
  styleUrls: ['./add-associate-to-batch.component.css']
})

/**
 * Class for adding an associate to the batch.
 * @author Patrick Kennedy | Batch: 1712-Steve
 * @author Shane Avery Sistoza | Batch: 1712-Steve
 * @author Jeffery Camacho | Batch: 1712-Steve
 *
 */
export class AddAssociateToBatchComponent implements OnInit {
  currentBatch: Batch;

  associates: BamUser[];
  @Input() searchTerm: string;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  constructor(private usersService: UsersService, private sessionService: SessionService) {
  }

  ngOnInit() {
    this.usersService.getUsersNotInBatch().subscribe(users => this.associates = users);
  }

  /**
   * Adds user to the batch.
   *
   * @param      {BamUser}  user    The user being added to the batch.
   */
  addUser(user: BamUser) {
    this.currentBatch = this.sessionService.getSelectedBatch();
    for (const associate of this.associates) {
      if (associate.userId === user.userId) {
        this.usersService.addUserToBatch(this.currentBatch.id, associate.userId).subscribe(users => {
          this.associates = users;
          this.associateAlert('success', `Successfully added ${user.firstName} ${user.lastName} to current batch.`);
        }, error => {
          this.associateAlert('danger', `Error: couldn't add ${user.firstName} ${user.lastName} to current batch.`);
        });
        break;
      }
    }
  }

  associateAlert(type, message) {
    this.notify.emit({type: type, message: message});
  }
}
