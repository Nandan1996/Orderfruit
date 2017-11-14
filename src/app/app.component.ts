import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, private auth: AuthService, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          this.router.navigateByUrl(returnUrl).then(nav => {
            if (!nav) {
              this.router.navigateByUrl('/');
            }
          });
        }
      }else {
        this.router.navigateByUrl('/');
      }
    });
  }
}
