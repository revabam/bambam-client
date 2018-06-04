import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { BamUser } from '../../models/bamuser.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: BamUser;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    // You can now access the user outside this scope after the page has loaded
    // this can us .map() if needs to be synchronous
    this.sessionService.putUserInSession().subscribe(data => {
      this.currentUser = data;
    });
  }

}
