import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGlobal } from 'src/app/Globals/UserGlobal';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-consultation-by-person',
  templateUrl: './consultation-by-person.component.html',
  styleUrls: ['./consultation-by-person.component.scss']
})
export class ConsultationByPersonComponent implements OnInit {

  public entitiesList:string[] = [];
  public selectedEntity:string = "";

  formoperation: FormGroup = this.formBuilder.group({
    userId: new FormControl('', [
      Validators.required
    ]),
    typeDocument: new FormControl('', [
      Validators.required
    ]),
    checkDataPolicy: new FormControl(false, [
      Validators.required
    ]),
    checkConditions: new FormControl(false, [
      Validators.required
    ]),
    entity: new FormControl('', [
      Validators.required
    ]),
  });
  errorVal:boolean = false;
  errorText:string ="";
  public isUserLogged: boolean = false;
  public checkPolicies: boolean = false;
  constructor(public AuthService: AuthService,
              public formBuilder: FormBuilder,
              public users: UsersService,
              public userGlobal: UserGlobal,
              private router: Router,
              public titleService:Title,
              public cookieService: CookieService) { 
                this.titleService.setTitle("Acreedor - Consulta de cliente");
                this.getEntitiesList();
              }

  async ngOnInit(){
    const user = await this.AuthService.getCurrentUser();
    if (!user) {
      this.isUserLogged = false;
    }
    else {
      this.isUserLogged = true;
      this.checkPolicies = true;
    }
  }

  private getEntitiesList(){
    let userEntity:string[] = this.cookieService.get("Entity").split(",");
    for(let entity of userEntity){
      this.entitiesList.push(entity.toUpperCase());
      this.selectedEntity = entity;
    }
  }

  onSubmit(){
    if(this.formoperation.valid){
      var { userId, typeDocument } = this.formoperation.value;
      userId = "" + typeDocument + userId;  
      let entity:string = "";
      if(this.isUserLogged){
        entity = this.selectedEntity;
      }
      else{
        entity = this.formoperation.controls.entity.value;
      }
      entity = entity.toUpperCase();
      this.users.getExistsUser(userId,entity).subscribe(Response => {
        this.userGlobal.lastDocument = userId;
        this.userGlobal.lastDocumentType = typeDocument;
        this.userGlobal.lastEntity = entity;
          if(Response.operationCode === 200){
            
            if(Response.exists){
              this.router.navigate(['/pb/found-person']);
            }
            else{
              this.router.navigate(['/pb/not-found-person']);
            }
          }
          else{
            this.router.navigate(['/pb/not-found-person']);
            console.log(Response.operationMessage);
          }
      },
      error =>{
        this.userGlobal.lastDocument = userId;
        this.userGlobal.lastDocumentType = typeDocument;
        this.userGlobal.lastEntity = entity;
        if(!error.exists){
          this.router.navigate(['/pb/not-found-person']);
        }
      }
      )
    }
    else{
      this.errorVal = true;
      this.errorText = "Debe completar los datos correctamente.";
    }   
  }

}
