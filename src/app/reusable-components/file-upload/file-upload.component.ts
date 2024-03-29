import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent{
  @Output() filesOut = new EventEmitter<any>();

  public fileIsValid:boolean = true;

  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef | undefined;
  @Input() files: any[] = [];
  @Input() filesAccepted: string = '';
  /**
   * on file drop handler
   */
  onFileDropped($event:any) {
    this.fileIsValid = true;
    this.files.pop();
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event:any) {
    const files = $event.target.files;
    this.files.pop();
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 100);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      let fileName:string[] = item.name.split(".");
      if(fileName[1].toLocaleLowerCase() == this.filesAccepted){
        item.progress = 0;
        this.files.push(item);
      }
      else{
        this.fileIsValid = false;
      }

    }
    this.uploadFilesSimulator(0);
    this.filesOut.emit(this.files);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes:any, decimals=2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  getListFiles(){
    return this.files;
  }
}
