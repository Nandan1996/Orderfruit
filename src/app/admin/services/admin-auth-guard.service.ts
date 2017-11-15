import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  canActivate() {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }

  constructor(private auth: AuthService, private userService: UserService) { }

}
