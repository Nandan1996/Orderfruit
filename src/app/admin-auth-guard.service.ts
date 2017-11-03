import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  canActivate() {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }

  constructor(private auth: AuthService, private userService: UserService) { }

}