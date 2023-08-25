import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

declare var gtag: (arg0: string, arg1: string, arg2: { page_path: string; }) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'solve-your-debt';

  constructor(router:Router){
    const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    ).subscribe( event =>  {
      gtag('config', 'UA-236248499-1',{
        'page_path':event.urlAfterRedirects
      });
    });
  }
}
