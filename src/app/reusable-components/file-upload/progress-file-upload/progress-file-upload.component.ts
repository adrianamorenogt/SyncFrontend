import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-file-upload',
  templateUrl: './progress-file-upload.component.html',
  styleUrls: ['./progress-file-upload.component.scss']
})
export class ProgressFileUploadComponent implements OnInit {
  @Input() progress = 0;
  constructor() { }

  ngOnInit(): void {
  }

}