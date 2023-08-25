import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { DebtProjectionComponent } from 'src/app/reusable-components/dialogs/debt-projection/debt-projection.component';
import { PasswordResetComponent } from 'src/app/reusable-components/dialogs/password-reset/password-reset.component';
import { AuthService } from 'src/app/services/auth.service';
import { ClientIndividualConsultationComponent } from '../client-individual-consultation/client-individual-consultation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog, public AuthService: AuthService, public titleService:Title) {
    this.titleService.setTitle("Home"); 
  }

  ngOnInit(): void {
  }

  viewClientProposal(){
    const dialogRef = this.dialog.open(ClientIndividualConsultationComponent, {
      height: '90vh',
      width: '80vw',
    });
  }
}
