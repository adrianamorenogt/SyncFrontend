import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { UserGlobal } from 'src/app/Globals/UserGlobal';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/services/users.service';
import { PasswordResetComponent } from 'src/app/reusable-components/dialogs/password-reset/password-reset.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { UserNotRegisterComponent } from 'src/app/reusable-components/dialogs/user-not-register/user-not-register.component';

@Component({
  selector: 'app-log-in-for-consultation',
  templateUrl: './log-in-for-consultation.component.html',
  styleUrls: ['./log-in-for-consultation.component.scss']
})
export class LogInForConsultationComponent implements OnInit {
  
  errorVal = false;
  errorText: string = "";
  hide = true;
  formlogin: FormGroup = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    connect: new FormControl('', [])
  });

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              public userGlobal: UserGlobal,
              public AuAuthService: AuthService,
              public users: UsersService,
              private cookieService: CookieService,
              private dialog:MatDialog,
              public titleService:Title) {
                this.titleService.setTitle('Login');
              }
 

  async ngOnInit(): Promise<void> {
    const user = await this.AuAuthService.getCurrentUser();
    if (user) {
      var con = this.cookieService.get("Connected");
      if (con === '1') {
        this.userGlobal.connect = true;
      }
      else {
        this.userGlobal.connect = false;
      }
    }
    /*END. ADD BACKGROUND AND OVERLAY LOGIN COMPONENT*/
  }
  async login(){
    if(this.formlogin.valid)
    { 
      var { email, password, connect } = this.formlogin.value;
      var con = '';
      if (connect) {
        // console.log("connected");
        this.userGlobal.connect = true;
        con = '1';
      }
      else {
        con = '0';
        this.userGlobal.connect = false;
      }


      // console.log('Entra->' , this.formlogin.value);
      try {
        const user = await this.AuAuthService.login(email, password);
        console.log(user);
        if (user) {
          //redirect
          this.users.getuserdata(email).subscribe(ResponseService => {
              //console.log(ResponseService);
              if(ResponseService !== null && ResponseService.operationCode === 200){
                this.cookieService.set("Connected", con);
                this.cookieService.set("Email", email);
                this.cookieService.set("UserName", ResponseService.operationContent.userName);
                this.cookieService.set("UserRole", ResponseService.operationContent.role);
                this.cookieService.set("UserId", ResponseService.operationContent.userIdentification);
                this.cookieService.set("UserTypeId", ResponseService.operationContent.identificationType);
                this.cookieService.set("Entity", ResponseService.operationContent.entity);

                console.log(ResponseService);
                switch (ResponseService.operationContent.role){
                  case "Admin":
                    this.router.navigate(['/ap/list-of-received']);
                    break;
                  case "User":
                    this.router.navigate(['/pb/kind-of-consultation']);
                    break;
                  default:
                    this.router.navigate(['/pb/kind-of-consultation']);
                    break;
                }
                  
              }
              else{
                this.errorVal = true;
                this.errorText = "No se encuentra la información del usuario.";
              }
          })
          console.log("Inició Sesión");
        }
        else {
          this.errorVal = true;
          this.errorText = "Usuario o contraseña incorrectos.";
        }
      }
      catch (error) {
        console.error(error);
      }

    }
    else{
      this.errorVal = true;
      this.errorText = "Debe completar los datos correctamente.";
    }
    
  }

  openPasswordResetDialog(){
    const dialogRef = this.dialog.open(PasswordResetComponent, {
      // height:'60vh',
      width: '50vw'
    })
  }

  public openUserNotRegisterDialog(){
    const dialogRef = this.dialog.open(UserNotRegisterComponent, {
      height:'80vh',
      width: '80vw'
    })
  }
}
