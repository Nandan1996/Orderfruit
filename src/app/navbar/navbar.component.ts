import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(x => {
      if (!!x) {
        console.log('Logged In');
      }else {
        console.log('Logged out');
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
