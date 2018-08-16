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
  selected = 1;

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

  getColor(num: number) {
    return (num === this.selected) ? 'primary' : '';
  }

  setSelected(num: number) {
    this.selected = num;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
