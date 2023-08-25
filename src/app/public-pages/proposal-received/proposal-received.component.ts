import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-proposal-received',
  templateUrl: './proposal-received.component.html',
  styleUrls: ['./proposal-received.component.scss']
})
export class ProposalReceivedComponent implements OnInit {

  constructor(public titleService:Title) {
    this.titleService.setTitle("Acreedor - Propuesta individual recibida")
  }

  ngOnInit(): void {
  }

}
