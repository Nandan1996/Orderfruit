import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([])
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    NavbarComponent
  ],
  exports: [NavbarComponent]
})
export class CoreModule { }
