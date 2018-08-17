import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { BamUser } from '../../../models/bam-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('hamburger') hamburger: ElementRef;
  private links = document.getElementsByClassName('nav-link');
  show = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.user.subscribe(
      user => {
        // If user is not logged in, don't show the navbar
        this.show = user !== null;

        if (!this.show && JSON.parse(sessionStorage.getItem('user'))) {
          this.userService.user.next(JSON.parse(sessionStorage.getItem('user')));
        }
      }
    );
  }

  /**
   * Click event to close hamburger menu.
   */
  private clickHamburgerLink() {
    if (window.innerWidth < 991) {
      this.hamburger.nativeElement.click();
    }
  }

  /**
   * Click event to toggle hamburger animation.
   */
  private toggleHamburgerMenu() {
    this.hamburger.nativeElement.classList.toggle('change');
  }

  /*
    Returns the color for the navbar buttons

    @param  path  the path of the navbar button
    @return       'primary' or '' depending on which page the user is on
  */
  getColor(path: string) {
    return (`/${path}` === window.location.pathname) ? 'primary' : '';
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
}
