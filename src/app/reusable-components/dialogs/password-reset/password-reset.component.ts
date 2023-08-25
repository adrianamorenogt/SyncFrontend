import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public operationResult:string = "";
  
  constructor(private formBuilder:FormBuilder, private authService:AuthService) { }
  formresetpassword: FormGroup = this.formBuilder.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });

  ngOnInit(): void {
  }

  public async sendEmailToResetPassword(){
    let {email} = this.formresetpassword.value;
    let success = await this.authService.sendEmailToResetPassword(email);
    if(success){
      this.operationResult = "Se ha enviado el correo de recuperación, ya puede cerrar este dialogo.";
    }
    else{
      this.operationResult = "No se pudo enviar el mensaje, verifique que el correo que se ingreso este correcto.";
    }
  }

}
