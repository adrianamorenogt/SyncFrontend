import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserGlobal } from 'src/app/Globals/UserGlobal';
import { AuthService } from 'src/app/services/auth.service';
import { ProposalService } from 'src/app/services/proposal.service';
import { UsersService } from 'src/app/services/users.service';
import { proposalModel } from '../../../models/proposalModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-debt-projection',
  templateUrl: './debt-projection.component.html',
  styleUrls: ['./debt-projection.component.scss']
})
export class DebtProjectionComponent implements OnInit {
  files: any[] = [];
  public filesAccepted = "pdf"
  public isUserLogged: boolean = false;
  public errorVal: boolean = false;
  public errorText: string = "";

  firstFormGroup: FormGroup = this.formBuilder.group({
    amount: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    reference: new FormControl('', [
      Validators.required
    ]),
    bank: new FormControl('', [
      Validators.required
    ])
  });

  secondFormGroup: FormGroup = this.formBuilder.group({
    description: new FormControl('', []),
    assessorName: new FormControl('', [
      Validators.required
    ]),
    assesorEmail: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(public AuthService: AuthService,
    public formBuilder: FormBuilder,
    public users: UsersService,
    public userGlobal: UserGlobal,
    private router: Router,
    private serviceProposal: ProposalService,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService,
    public dialogRef: MatDialogRef<DebtProjectionComponent>,
    public titleService:Title) {
      this.titleService.setTitle("Acreedor - Propuesta individual")
  }
  banks = [];
  async ngOnInit(): Promise<void> {
    const user = await this.AuthService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/pb/log-in-for-consultation']);
    }
    else {
      this.isUserLogged = true;
    }
    this.users.getBanks().subscribe(resp => {
      this.banks = resp.Banks;
    })
  }

  async initTemplateBuild() {
    let isFormCorrect = false;
    if(this.isUserLogged){
      isFormCorrect = this.firstFormGroup.valid;
    }
    else{
      isFormCorrect = this.firstFormGroup.valid && this.secondFormGroup.valid;
    }
    if (isFormCorrect) {
      this.errorVal = false;
      this.errorText = "";

      var { amount, reference, bank } = this.firstFormGroup.value;
      var { description, assessorName, assesorEmail } = this.secondFormGroup.value;
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

      try {
        let requestProp: proposalModel = new proposalModel();
        requestProp.userId = this.userGlobal.lastDocument;
        //requestProp.typeDocument = this.userGlobal.lastDocumentType;
        requestProp.amount = parseInt(amount, 10);
        requestProp.bank = bank;
        requestProp.description = description;
        requestProp.reference = reference;
        requestProp.proposal = true;
        if (this.isUserLogged) {
          requestProp.sendByEmail = this.cookieService.get("Email");
          requestProp.sendBy = this.cookieService.get("UserName");
        }
        else {
          requestProp.sendByEmail = assesorEmail;
          requestProp.sendBy = "ASESOR SIN CONVENIO: " + assessorName;
        }
        console.log(assesorEmail)
        console.log(assessorName)
        requestProp.fileBase64 = base;
        requestProp.fileName = nameFile;
        requestProp.fileExtention = extention;
        this.serviceProposal.sendIndividualProposal(requestProp).subscribe(Resp =>{
          console.log(Resp);
          if (Resp.operationCode === 200){
            this.router.navigate(['/pb/proposal-received']);
            this.dialogRef.close();
          }
          else{
            console.error(Resp.operationMessage);
            this.openSnackBar("Se presentó un error.","Aceptar")
          }
        });
      }
      catch (error) {
        console.error(error);
        this.openSnackBar("Se presentó un error.", "Aceptar")
      }
    }
    else {
      this.errorVal = true;
      this.errorText = "Debe completar los datos correctamente.";
    }
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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}

