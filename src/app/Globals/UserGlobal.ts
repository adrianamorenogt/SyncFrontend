import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserGlobal {
  /**
   * @type {boolean}
   */
  private _connect :boolean = false ;
  private _lastDocument:string = '' ;
  private _lastDocumentType:string = '';
  private _filegenerated:String = '';
  private _filename:String = '' ;
  private _lastEntity: string = '';
  public get lastEntity(): string {
    return this._lastEntity;
  }
  public set lastEntity(value: string) {
    this._lastEntity = value;
  }

  get connect(): boolean {
    return this._connect;
  }

  set connect(value: boolean) {
    this._connect = value;
  }

  get lastDocument(): string {
    return this._lastDocument;
  }

  set lastDocument(value: string) {
    this._lastDocument = value;
  }

  get lastDocumentType(): string {
    return this._lastDocumentType;
  }

  set lastDocumentType(value: string) {
    this._lastDocumentType = value;
  }

  get filegenerated(): String {
    return this._filegenerated;
  }

  set filegenerated(value: String) {
    this._filegenerated = value;
  }

  get filename(): String {
    return this._filename;
  }

  set filename(value: String) {
    this._filename = value;
  }

}