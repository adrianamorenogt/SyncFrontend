import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { proposalCompleteResponse } from '../models/proposalCompleteResponse';
import { proposalModel } from '../models/proposalModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private urlUsers: string =environment.urlUsers;
  private apiKeyUsers: string = environment.apiKeyUsers;
  constructor(
    private http: HttpClient) { }

  public getuserdata(email: string): Observable<any>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };
      return this.http.get(this.urlUsers + 'search-users?email=' + email, httpOptions);
  }

  public getActiveUsersBase(body:proposalModel): Observable<proposalCompleteResponse>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };

    return <Observable<proposalCompleteResponse>>this.http.post(this.urlUsers + 'search-users',body,httpOptions)
  }

  public getExistsUser(document: string, entity:string): Observable<any>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };
    let Body ={
      userId:document,
      entity:entity
    }
      return this.http.post(this.urlUsers + 'search-users', Body, httpOptions);
  }

  public getAuthorityLetter(document: string): Observable<any>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };
      return this.http.get(this.urlUsers + 'search-users?doccp=' + document, httpOptions);
  }

public getDocument(url:string){
  return this.http.get(this.urlUsers, { responseType: 'blob' });
}
  public getBanks(): Observable<any>{
    return <Observable<any>> this.http.get('assets/banks.json')
  }

  public getUserAuthorization(document: string, TypeDocument: string): Observable<any>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };
    let body = {
      userId:document,
      typeDocument:TypeDocument
    }
    return this.http.post(this.urlUsers + 'search-users' , body, httpOptions);
  }
}
