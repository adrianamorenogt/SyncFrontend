import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { DetailProposalComponent } from 'src/app/reusable-components/dialogs/detail-proposal/detail-proposal.component';
import { ProposalService } from 'src/app/services/proposal.service';
import { ProposalGlobal } from 'src/app/Globals/ProposalGlobal';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';


@Component({
  selector: 'app-list-of-received',
  templateUrl: './list-of-received.component.html',
  styleUrls: ['./list-of-received.component.scss']
})

export class ListOfReceivedComponent implements OnInit,AfterViewInit{
  constructor(public dialog: MatDialog,
              public ProposalService :ProposalService,
              public proposalGlobal:ProposalGlobal,
              private _liveAnnouncer: LiveAnnouncer) {}
  listProposals:any;


  ngOnInit(){
      this.ProposalService.getProposals(0,null).subscribe(Resp =>{
        console.log(Resp);
        this.listProposals = Resp.proposals;
        if (Resp.operationCode === 200){
            Resp.proposals.forEach((element: any) =>{
            let date = new Date(element.dateInserted);
             ELEMENT_DATA.push({no:element.idProp , enviadopor: element.sendBy, referencia: element.reference, monto: element.amount.toString(), tipo:element.typeProposal, fecha:date.toString()});
            })
            this.dataSource = new MatTableDataSource(ELEMENT_DATA);
            this.ngAfterViewInit();
        }
        else
        {
          console.log(Resp.operationMessage);
        }
      })
  }
  openDialog(id:string) {
    console.log(id);
    this.proposalGlobal.proposal =  this.listProposals.find((x: { idProp: string; }) => x.idProp === id);
    console.log( this.proposalGlobal);
    const dialogRef = this.dialog.open(DetailProposalComponent,{
      width: '574px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  displayedColumns: string[] = ['no', 'enviadopor', 'referencia', 'monto', 'tipo', 'fecha', 'more'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

export interface PeriodicElement {
  no: string;
  enviadopor: string;
  referencia: string;
  monto: string;
  tipo: string;
  fecha:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}
