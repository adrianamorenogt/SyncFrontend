import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserGlobal } from 'src/app/Globals/UserGlobal';
import { proposalModel } from 'src/app/models/proposalModel';
import { AuthService } from 'src/app/services/auth.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-client-individual-consultation',
  templateUrl: './client-individual-consultation.component.html',
  styleUrls: ['./client-individual-consultation.component.scss']
})
export class ClientIndividualConsultationComponent implements OnInit {

  public clientExists = false;
  public files: File[];
  public filesAccepted:string="pdf";
  public banks = [];

  formoperation: FormGroup = this.formBuilder.group({
    userId: new FormControl('', [
      Validators.required
    ]),
    typeDocument: new FormControl('', [
      Validators.required
    ]),
    entity: new FormControl('', [
      Validators.required
    ]),
    checkDataPolicy: new FormControl(false, [
      Validators.required
    ]),
    checkConditions: new FormControl(false, [
      Validators.required
    ])
  });

  formClientProposal: FormGroup = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    cellphone: new FormControl('', [
      Validators.required
    ]),
    bank: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required
    ])
  });

  errorVal: boolean = false;
  errorText: string = "";
  constructor(public AuthService: AuthService,
    public formBuilder: FormBuilder,
    public users: UsersService,
    public userGlobal: UserGlobal,
    private router: Router,
    private cookieService: CookieService,
    private _snackBar: MatSnackBar,
    private proposalService: ProposalService,
    private dialogRef: MatDialogRef<ClientIndividualConsultationComponent>,
    public titleService:Title) {
    this.files = [];
    this.titleService.setTitle("Cliente - Propuesta individual");
  }

  ngOnInit(): void {
    this.users.getBanks().subscribe(resp => {
      this.banks = resp.Banks;
    })
  }


  onSubmit() {
    if (this.formoperation.valid) {
      var { userId, typeDocument, entity } = this.formoperation.value;
      userId = "" + typeDocument + userId;
      let entityUpper:string = entity.toUpperCase();
      this.users.getExistsUser(userId, entityUpper).subscribe(Response => {
        this.userGlobal.lastDocument = userId;
        this.userGlobal.lastDocumentType = typeDocument;
        if (Response.operationCode === 200) {

          if (Response.exists) {
            this.clientExists = true;
            this.errorVal = false;
          }
          else {
            this.errorText = "Lo sentimos el cliente no se encuentra en nuestra base.";
            this.errorVal = true;
          }
        }
        else {
          this.errorText = "Lo sentimos el cliente no se encuentra en nuestra base.";
          this.errorVal = true;
          console.log(Response.operationMessage);
        }
      },
      error =>{
        if(!error.exists){
          this.errorText = "Lo sentimos el cliente no se encuentra en nuestra base.";
          this.errorVal = true;
        }
      })
    }
    else {
      this.errorVal = true;
      this.errorText = "Debe completar los datos correctamente.";
    }
  }

  async onSendClientProposal() {
    if (this.formClientProposal.valid) {
      let { name, email, cellphone, bank, description } = this.formClientProposal.value;
      let { userId, typeDocument, entity } = this.formoperation.value;

      let base: String = "";
      let nameFile: String = "";
      let extention: String = "";
      if (this.files.length > 0) {
        if (this.files.length > 1) {
          this.openSnackBar("Solo puedes adjuntar 1 archivo.", "Aceptar")
        }
        else {
          const array = await this.getFilesArrayBuffer(this.files[0]);
          let nameFilep = this.files[0].name.split('.');
          if (nameFilep.length < 2 || nameFilep[1] !== "pdf") {
            this.openSnackBar("Solo se permiten Archivos en formato pdf.", "Aceptar")
          }
          else {
            base = this.arrayBufferToBase64(array);
            nameFile = nameFilep[0];
            extention = nameFilep[1];
          }
        }
      }

      let clientProposal: proposalModel = new proposalModel();

      userId =""+ typeDocument + userId;
      clientProposal.userId = userId;
      //clientProposal.typeDocument = typeDocument;
      clientProposal.bank = bank;
      clientProposal.description = description;
      clientProposal.proposal = true;
      clientProposal.sendByEmail = email;
      clientProposal.sendBy = "CLIENTE: " + name;
      clientProposal.fileBase64 = base;
      clientProposal.fileName = nameFile;
      clientProposal.fileExtention = extention;
      clientProposal.typeProposal = "CLIENTPROPOSAL";

      clientProposal.entity = entity.toUpperCase();

      this.proposalService.sendIndividualProposal(clientProposal).subscribe(Resp => {
        console.log(Resp);
        if (Resp.operationCode === 200) {
          this.router.navigate(['/pb/proposal-received']);
          this.dialogRef.close();
        }
        else {
          console.error(Resp.operationMessage);
          this.openSnackBar("Disculpe, se presento un error, vuelva a enviar la propuesta.", "Aceptar")
        }
      },
        error => {
          console.log(error);
        });
    }
    else {
      this.errorVal = true;
      this.errorText = "Debe completar los datos correctamente.";
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getFilesArrayBuffer = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const arrayBuffer = reader.result;
      resolve(reader.result)
    }
  })
  arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
