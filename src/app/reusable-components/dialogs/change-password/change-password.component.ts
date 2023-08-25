import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public operationResult:string = "";

  constructor(private formBuilder:FormBuilder, private authService:AuthService) { }

  formChangePassword: FormGroup = this.formBuilder.group({
    password: new FormControl('', [
      Validators.required,
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmNewPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  ngOnInit(): void {
  }

  public async changePassword(){
    let {password, newPassword, confirmNewPassword } = this.formChangePassword.value;
    let result = await this.authService.changePassword(password, newPassword, confirmNewPassword);
    console.log(result)
    if(result == undefined){
      result = "";
    }
    this.operationResult = result;
  }

}
