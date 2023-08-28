import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { UserGlobal } from 'src/app/Globals/UserGlobal';
import { authorityLetterRequest } from 'src/app/models/authorityLetterRequest';
import { ProposalService } from 'src/app/services/proposal.service';

@Component({
  selector: 'app-multiple-consultation-generated',
  templateUrl: './multiple-consultation-generated.component.html',
  styleUrls: ['./multiple-consultation-generated.component.scss']
})
export class MultipleConsultationGeneratedComponent implements OnInit {

  constructor(public userGlobal: UserGlobal, public titleService: Title,
    private serviceProposal: ProposalService,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService) {
    this.titleService.setTitle("Acreedor - Propuesta multiple recibida");
  }

  ngOnInit(): void {
  }

  public clickDownload() {
    const linkSource = 'data:application/pdf;base64,' + this.userGlobal.filegenerated;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = this.userGlobal.filename.toString();
    downloadLink.click();
  }

  public clickDownloadAuthorityLetter() {
    let req: authorityLetterRequest = new authorityLetterRequest();
    req.baseFile = this.userGlobal.filegenerated;
    req.fileName = "File";
    req.fileExtention = "csv";
    req.emailSended = this.cookieService.get("Email");
    this.serviceProposal.getAuthorityLetters(req).subscribe(Resp => {
      console.log(Resp);
      if (Resp.operationCode !== 200) {
        this.openSnackBar(Resp.operationMsg, "Aceptar")
      }
      else {
        this.openSnackBar("Enviaremos la petición a tu correo en cuanto esté listo, puede tardar unos minutos", "Aceptar")
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
