import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-authorization',
  templateUrl: './client-authorization.component.html',
  styleUrls: ['./client-authorization.component.scss']
})
export class ClientAuthorizationComponent implements OnInit {

  
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  userDocument = "";
  userDocumentType = "";
  constructor(public users:UsersService, private dialogRef:MatDialogRef<ClientAuthorizationComponent>) {
    this.users.getExistsUser(this.userDocument, this.userDocumentType).subscribe(resp=>{
      if(resp.operationCode == 200){
        if(resp.exists){
          var file = new Blob([resp]);
          this.pdfSrc = URL.createObjectURL(file);
          this.pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
        }else{
          this.dialogRef.close();
        }
      }else{
        this.pdfSrc = "";
        this.dialogRef.close();
      }
    });
  }

  ngOnInit(): void {
  }

}
