import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('hamburger') hamburger: ElementRef;
  private links = document.getElementsByClassName('nav-link');

  constructor(private router: Router) { }

  ngOnInit() {
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
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
