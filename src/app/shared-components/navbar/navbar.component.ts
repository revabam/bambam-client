import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { BamUser } from '../../models/bam-user';
import { MatDialog } from '@angular/material';
import { UserInfoComponent } from '../user-info/user-info.component';

/**
 * Shows current page view and navigates to different page views of application.
 * Does not display if current session is not associated with a user.
 * @author Bradley Walker | Khaleel Williams | 1806-Jun-18-USF-Java | Wezley Singleton
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {

  user: BamUser;

  show = true;

  constructor(
    private userService: UserService,
    private router: Router,
    public modal: MatDialog
  ) { }

  ngOnInit() {
    this.userService.user.subscribe(
      user => {
        // If user is not logged in, don't show the navbar
        this.show = user !== null;

        if (!this.show && JSON.parse(sessionStorage.getItem('user'))) {
          this.userService.user.next(JSON.parse(sessionStorage.getItem('user')));
        } else if (!this.show && !JSON.parse(sessionStorage.getItem('user'))) {
          if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            this.router.navigate(['login']);
          }
        }
      }
    );
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  /*
    Returns the color for the navbar buttons

    @param  path  the path of the navbar button
    @return       'primary' or '' depending on which page the user is on
  */
  getColor(path: string) {
    return (`/${path}` === window.location.pathname) ? 'accent' : '';
  }

  /*
    Logs the user out by clearing session storage and routing them to the
    login page
  */
  logout() {
    // Clear the user out of session strorage
    sessionStorage.clear();

    // Push null onto the user subject so that the navbar disappears
    this.userService.user.next(null);

    this.router.navigate(['login']);
  }

  editUserModal() {
    const modalRef = this.modal.open(UserInfoComponent, {
      width: '50%'
    });
  }

}
