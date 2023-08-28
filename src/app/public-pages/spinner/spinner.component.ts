import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isloading$ = this.spinnerSvc.isloading$;

  constructor(private spinnerSvc: SpinnerService, public cookieService: CookieService) { }

  ngOnInit(): void {
  }

}
