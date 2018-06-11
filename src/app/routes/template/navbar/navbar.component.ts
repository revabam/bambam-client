import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('hamburger') hamburger: ElementRef;
  private links = document.getElementsByClassName('nav-link');

  constructor() { }

  ngOnInit() {
  }

  /**
   * Click event to close hamburger menu.
   */
  private clickHamburger() {
    if (window.innerWidth < 991) {
      this.hamburger.nativeElement.click();
    }
  }

}
