import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BamUser } from '../../../models/bam-user';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('hamburger') hamburger: ElementRef;
  private links = document.getElementsByClassName('nav-link');
  selected = 1;
  user: BamUser;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    if (this.user !== sessionUser) {
      this.user = sessionUser;
    }
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

  getColor(num: number) {
    return (num === this.selected) ? 'primary' : '';
  }

  setSelected(num: number) {
    this.selected = num;
  }

  logout() {
    sessionStorage.setItem('user', null);
    this.router.navigate(['login']);
  }
}
