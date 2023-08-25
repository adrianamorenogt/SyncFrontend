import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-user-not-register',
  templateUrl: './user-not-register.component.html',
  styleUrls: ['./user-not-register.component.scss']
})
export class UserNotRegisterComponent implements OnInit {

  constructor(private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  public route(){
    this.router.navigate(["/pb/consultation-by-person"]);
  }

  public openForm(){
    const dialogRef = this.dialog.open(RegisterFormComponent, {
      height:'80vh',
      width: '80vw'
    })
  }
}
