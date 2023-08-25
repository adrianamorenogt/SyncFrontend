import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserGlobal } from 'src/app/Globals/UserGlobal';

@Component({
  selector: 'app-not-found-person',
  templateUrl: './not-found-person.component.html',
  styleUrls: ['./not-found-person.component.scss']
})
export class NotFoundPersonComponent implements OnInit {
  documentId:string = '';
  documentType:string = '';
  entity:string = '';
  constructor(public userGlobal: UserGlobal,public titleService:Title) {
    this.titleService.setTitle("Acreedor - Cliente no encontrado");
  }

  ngOnInit(): void {
      this.documentId = this.userGlobal.lastDocument;
      this.entity = this.userGlobal.lastEntity;
      if(this.documentId.includes("CE")){  
        this.documentType = "Cédula de extrangería";
        this.documentId = this.documentId.replace("CE", "");
      }
      else{
        this.documentType = "Cédula de ciudadanía";
        this.documentId = this.documentId.replace("CC", "");
      }
  }

}
