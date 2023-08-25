import { Component, OnInit } from '@angular/core';
import { ProposalGlobal } from 'src/app/Globals/ProposalGlobal';
import { ProposalService } from 'src/app/services/proposal.service';
@Component({
  selector: 'app-detail-proposal',
  templateUrl: './detail-proposal.component.html',
  styleUrls: ['./detail-proposal.component.scss']
})
export class DetailProposalComponent implements OnInit {

  constructor(public proposalGlobal:ProposalGlobal,
              public propservice: ProposalService) { }
  sendBy:string ="";
  reference:string="";
  amount:string="";
  type:string="";
  date:string="";
  bank:string="";
  description:string="";
  documentName:string="";
  attached:boolean=false;
  ngOnInit(): void {
    this.sendBy=this.proposalGlobal.proposal.sendBy;
    this.amount=this.proposalGlobal.proposal.amount.toString();
    this.reference=this.proposalGlobal.proposal.reference;
    this.type=this.proposalGlobal.proposal.typeProposal;
    let date =  new Date(this.proposalGlobal.proposal.dateInserted);
    this.date=date.toString();
    this.bank = this.proposalGlobal.proposal.bank;
    this.description = this.proposalGlobal.proposal.description;
    if(this.proposalGlobal.proposal.keyFile != "N/A")
    { 
      let fileName =  this.proposalGlobal.proposal.keyFile.split("/");
      this.documentName = fileName[fileName.length -1];
      this.attached = true;
    }
    
    console.log(this.proposalGlobal);
  }
  
  getfile(){
      this.propservice.getFiles(this.proposalGlobal.proposal.keyFile).subscribe(resp => {
        const linkSource = 'data:application/pdf;base64,' + resp.documentBase;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = this.documentName;
        downloadLink.click();
      })
  }

}
