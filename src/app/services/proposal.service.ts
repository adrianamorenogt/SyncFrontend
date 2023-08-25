import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { proposalModel} from '../models/proposalModel';
import { authorityLetterRequest} from '../models/authorityLetterRequest';
import { authorityLetterResponse} from '../models/authorityLetterResponse';
import { proposalCompleteResponse } from '../models/proposalCompleteResponse';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  constructor(private http: HttpClient) { }
  private urlUsers: string =environment.urlUsers;
  private urlAL: string =environment.urlAL;
  private apiKeyUsers: string = environment.apiKeyUsers;
  private apiKeyAL: string = environment.apiKeyAL;
  sendIndividualProposal(Body: proposalModel):Observable<proposalCompleteResponse>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };
    Body.typeProposal = 'Individual';
    return <Observable<proposalCompleteResponse>>this.http.post(this.urlUsers + 'search-users',Body,httpOptions)
  }

  sendIndMultiProposal(Body: proposalModel):Observable<proposalCompleteResponse>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };
    Body.typeProposal = 'Multiple';
    return <Observable<proposalCompleteResponse>>this.http.put(this.urlUsers + 'search-users',Body,httpOptions)
  }
  getProposals(limit:Number, lastKeyEvaluated:any):Observable<any>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };
    let body = {
      proposal:false,
      limitScann:limit,
      lastKeyEvaluated:lastKeyEvaluated
    }
    return <Observable<any>>this.http.put(this.urlUsers + 'search-users',body,httpOptions)
  }

  getFiles(key:String):Observable<any>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyUsers
      })
    };
    return this.http.get(this.urlUsers + 'search-users?doc=' + key,httpOptions);
  }

  getAuthorityLetters(Body: authorityLetterRequest):Observable<authorityLetterResponse>{
    let  httpOptions = {
      headers: new HttpHeaders({
        "Content-Type" : "application/json",
        "x-api-key": this.apiKeyAL
      })
    };
    return <Observable<authorityLetterResponse>>this.http.post(this.urlAL,Body,httpOptions)
  }
}
