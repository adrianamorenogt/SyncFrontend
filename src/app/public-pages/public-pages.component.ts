import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGlobal } from '../Globals/UserGlobal';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-public-pages',
  templateUrl: './public-pages.component.html',
  styleUrls: ['./public-pages.component.scss']
})
export class PublicPagesComponent implements OnInit {

  public isConnected = false;

  constructor(public AuthService: AuthService,
              public router: Router,
              public userGlobal:UserGlobal,
              private cookieService: CookieService) {

               }
  userActivity: any;
  userInactive: Subject<any> = new Subject();
  async ngOnInit(): Promise<void> {
    var con = this.cookieService.get("Connected");
    //console.log("CONEC: "+ con);
    if(con ==='1')
    {
      this.userGlobal.connect = true;
    }
    else{
      this.userGlobal.connect = false;
      this.setTimeout();
      this.userInactive.subscribe(() =>
      this.onLogout());
    }
    const user = await this.AuthService.getCurrentUser();
    if (!user) {
      this.isConnected = false;
    }
    else {
      this.isConnected = true;
    }
  }

  async onLogout() {
    try {
      await this.AuthService.logout();
      this.cookieService.deleteAll();
      this.router.navigate(['/pb/home']);
    }
    catch (error
    ) {
      console.log(error);
    }
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 300000);
  }

  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  async refreshUserState() {
    const user = await this.AuthService.getCurrentUser();
    if (!user) {
      this.isConnected = false;
    }
    else {
      this.isConnected = true;
    }
    if(!this.userGlobal.connect)
    {
      clearTimeout(this.userActivity);
      this.setTimeout();
    }
  }


}
