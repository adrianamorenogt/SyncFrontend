import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGlobal } from '../Globals/UserGlobal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-advisor-portal',
    templateUrl: './advisor-portal.component.html',
    styleUrls: ['./advisor-portal.component.scss']
})
export class AdvisorPortalComponent implements OnInit, OnDestroy{
    userName= "";
    constructor(
        public AuthService: AuthService,
        public router: Router,
        public userGlobal:UserGlobal,
        private cookieService: CookieService,
        ){}

    async ngOnInit(): Promise<void> {
        /*START. ADD PROPERTIES FOR SESSION'S SCREENS*/
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('bg-cstmLogin');
        /*END. ADD PROPERTIES FOR SESSION'S SCREENS*/

        const user = await this.AuthService.getCurrentUser();
        if (!user) {
            //this.router.navigate(['/pb/log-in-for-consultation']);
        }
        this.userName=this.cookieService.get("UserName");
    }

    ngOnDestroy(): void {
        /*START. REMOVE PROPERTIES FOR SESSION'S SCREENS*/
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('bg-cstmLogin');    
        /*END. REMOVE PROPERTIES FOR SESSION'S SCREENS*/
    }
    async onLogout() {
        try {
          await this.AuthService.logout();
          this.cookieService.deleteAll();
          this.router.navigate(['/pb/log-in-for-consultation']);
        }
        catch (error
        ) {
          console.log(error);
        }
      }
}