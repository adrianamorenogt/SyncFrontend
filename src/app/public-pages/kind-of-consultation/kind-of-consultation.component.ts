import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGlobal } from 'src/app/Globals/UserGlobal';
import { proposalModel } from 'src/app/models/proposalModel';
import { ChangePasswordComponent } from 'src/app/reusable-components/dialogs/change-password/change-password.component';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-kind-of-consultation',
  templateUrl: './kind-of-consultation.component.html',
  styleUrls: ['./kind-of-consultation.component.scss']
})
export class KindOfConsultationComponent implements OnInit {

  public entitiesList:string[] = [];
  public selectedEntity:string = "";

  constructor(
              public AuthService: AuthService,
              private router: Router,
              public userGlobal: UserGlobal,
              public cookieService: CookieService,
              private userService: UsersService,
              private dialog:MatDialog,
              public titleService:Title) { 
                this.titleService.setTitle("Acreedor - Tipo de propuesta");
                this.getEntitiesList();
              }

  ngOnInit() {
    
  }

  private getEntitiesList(){
    let userEntity:string[] = this.cookieService.get("Entity").split(",");
    for(let entity of userEntity){
      this.entitiesList.push(entity.toUpperCase());
      this.selectedEntity = entity;
    }
  }

  public downloadActiveClientsBase(){
    let body : proposalModel = new proposalModel();
    body.entity = this.selectedEntity;
    body.clientQuery = true;
    body.proposal = false;
    body.fileName = "Clientes_" + body.entity;
    body.fileExtention = "csv";
    console.log(body);
    this.userService.getActiveUsersBase(body).subscribe(
      (response) =>{
        console.log(response);
        if(response.operationCode == 200){
          this.userGlobal.filegenerated = response.base64FileCSV;
          this.userGlobal.filename = body.fileName + "." + body.fileExtention;
          const linkSource = 'data:application/pdf;base64,' + this.userGlobal.filegenerated;
          const downloadLink = document.createElement('a');
          downloadLink.href = linkSource;
          downloadLink.download = this.userGlobal.filename.toString();
          downloadLink.click();
        }
      }
    );
  }

  public openChangePasswordDialog(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      height:'70vh',
      width: '60vw'
    })
  }
}
