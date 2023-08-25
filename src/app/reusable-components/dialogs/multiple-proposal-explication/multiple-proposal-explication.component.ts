import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-multiple-proposal-explication',
  templateUrl: './multiple-proposal-explication.component.html',
  styleUrls: ['./multiple-proposal-explication.component.scss']
})
export class MultipleProposalExplicationComponent implements OnInit {

  constructor(public titleService:Title) {
    this.titleService.setTitle("Acreedor - Explicación propuesta multiple")
  }

  ngOnInit(): void {
  }

}
