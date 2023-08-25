import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGlobal } from 'src/app/Globals/UserGlobal';
import { proposalModel } from 'src/app/models/proposalModel';
import { MultipleProposalExplicationComponent } from 'src/app/reusable-components/dialogs/multiple-proposal-explication/multiple-proposal-explication.component';
import { AuthService } from 'src/app/services/auth.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-multiple-consultation',
  templateUrl: './multiple-consultation.component.html',
  styleUrls: ['./multiple-consultation.component.scss']
})
export class MultipleConsultationComponent implements OnInit {
  files: any[] = [];

  filesAccepted:string="csv";

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private _snackBar: MatSnackBar,
              private cookieService: CookieService,
              public users: UsersService,
              private serviceProposal:ProposalService,
              public userGlobal: UserGlobal,
              public AuthService: AuthService,
              private dialog:MatDialog,
              public titleService:Title) { 
                this.titleService.setTitle("Acreedor - Propuesta Multiple");
              }

  ngOnInit(){
  }

  getFilesArrayBuffer = (file:any) => new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result;
      resolve(reader.result)
    }
  })
  arrayBufferToBase64( buffer: any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  async initTemplateBuild(){
    console.log(this.files);
   
    let base:String ="";
    let nameFile:String ="";
    let extention:String ="";
    if(this.files.length > 0){
      if(this.files.length > 1){
        this.openSnackBar("Solo puedes adjuntar 1 archivo.","Aceptar")
      }
      else{
        const array = await this.getFilesArrayBuffer(this.files[0]);
        let nameFilep= this.files[0].name.split('.');
        if(nameFilep.length < 2 || nameFilep[1] !== "csv"){
            this.openSnackBar("Solo se permiten Archivos en formato csv.","Aceptar")
        }
        else{
          base= this.arrayBufferToBase64(array);
          nameFile = nameFilep[0];
          extention = nameFilep[1];
        }
      }
      try{
      
        let requestProp: proposalModel = new proposalModel();
        requestProp.bank = "";
        requestProp.description = "";
        requestProp.reference = "";
        requestProp.proposal = true;
        requestProp.sendByEmail = this.cookieService.get("Email");
        requestProp.sendBy= this.cookieService.get("UserName");
        requestProp.fileBase64 = base;
        requestProp.fileName = nameFile;
        requestProp.fileExtention = extention;
        this.serviceProposal.sendIndMultiProposal(requestProp).subscribe(Resp =>{
          console.log(Resp);
            if (Resp.operationCode === 200){
              this.userGlobal.filegenerated = Resp.base64FileCSV;
              this.userGlobal.filename = "File.csv";
              this.router.navigate(['/pb/multiple-consultation-generated']);
            }
            else{
              console.log(Resp.operationMessage);
              this.openSnackBar("Se presentó un error.","Aceptar")
            }
        });
      }
      catch (error){
          console.log(error);
          this.openSnackBar("Se presentó un error.","Aceptar")
      }
     
    }
    else{
      this.openSnackBar("Debes agregar un archivo.","Aceptar")
    }

    
    //console.log(amount, ' - ', reference, ' - ',bank, ' - ',description); 
    //console.log(this.files);
  }

  openMultipleProposalExplication(){
    const dialogRef = this.dialog.open(MultipleProposalExplicationComponent, {
      height: '90vh',
      width: '80vw',
    });
  }
}
