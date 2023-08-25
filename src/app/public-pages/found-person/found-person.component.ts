import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserGlobal } from 'src/app/Globals/UserGlobal';
import { ClientAuthorizationComponent } from 'src/app/reusable-components/dialogs/client-authorization/client-authorization.component';
import { DebtProjectionComponent } from 'src/app/reusable-components/dialogs/debt-projection/debt-projection.component';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-found-person',
  templateUrl: './found-person.component.html',
  styleUrls: ['./found-person.component.scss']
})
export class FoundPersonComponent implements OnInit {
  documentId:string = '';
  documentType:string = '';
  labelerror:string = '';
  constructor(public dialog: MatDialog,
              public userGlobal: UserGlobal,
              public AuthService: AuthService,
              public users: UsersService,
              private router: Router,
              public titleService:Title) {
                this.titleService.setTitle("Acreedor - Cliente encontrado");
              }

  debtProjection() {
    const dialogRef = this.dialog.open(DebtProjectionComponent, {
      height: '90%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  viewClientAuthorization(){
    const dialogRef = this.dialog.open(ClientAuthorizationComponent, {
      height: 'auto',
      width: '80vw',
    });
    dialogRef.componentInstance.userDocument = this.documentId;
    dialogRef.componentInstance.userDocumentType = this.documentType;
  }
  findAuthorityLetter(){
    this.labelerror = '';
    let doc = this.documentId.substring(2,this.documentId.length)
    this.users.getAuthorityLetter(doc).subscribe(Response => {
      if(Response.operationCode==200 && Response.documentBase !== null && Response.documentBase !== ""){
        window.open(Response.documentBase);
      }
      else{
        this.labelerror = "Carta Poder no encontrada."
      }
    },
    error =>{
      this.labelerror = "Carta Poder no encontrada."
    })
  }

  ngOnInit(){
    if(this.userGlobal.lastDocument === '')
    { 
      this.router.navigate(['/pb/kind-of-consultation']);
    }
    else{
      this.documentId = this.userGlobal.lastDocument;
      switch (this.userGlobal.lastDocumentType) {
        case "CC":
          this.documentType = "Cédula de ciudadanía";
          break;
        case "CE":
          this.documentType = "Cédula de extrangería";
          break;
        default:
          this.documentType = "Cédula de ciudadanía";
          break;  
      }
    }
    
  }

}