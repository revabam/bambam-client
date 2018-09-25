import { Component, OnInit } from '@angular/core';
import { BamUser } from '../../models/bam-user';
import { Router } from '@angular/router';
import { Batch } from '../../models/batch';
import { BatchService } from '../../services/batch.service';
import { UserService } from '../../services/user.service';

/**
 * This component is the dashboard page. It is the page that the
 * user is directed to after they login. It displays personal
 * information and batch information to the user.
 *
 * @author Joseph Shannon | Drake Mapel | 1806-Spark | Steven Kelsey
 */

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user: BamUser;
  batch: Batch;
  batchWeek: number;
  percentCompletion: number;
  editing = false;
  firstName: string;
  lastName: string;

  constructor(
    private router: Router,
    private batchService: BatchService,
    private userService: UserService
  ) { }

  /**
  * This method runs when the component is initialized. It will get the user
  * data from the session storage and display both the user's personal info,
  * and info about the batch they are associated with.
  */
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  /**
   * This method toggles editing mode on the personal information
   * card.
   */
  toggleEdit() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.editing = true;
  }

  /**
   * This method is called if the user cancels out of editing mode
   */
  cancelEdit() {
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.editing = false;
  }

  /**
   * This method is called if the user saves the changes made in editing mode.
   * It updates the user's info in the database and in session storage.
   */
  saveChanges() {
    this.userService.updateInfo(this.user).subscribe(
      result => {
        sessionStorage.setItem('user', JSON.stringify(this.user));
      }
    );
    this.editing = false;
  }
}
