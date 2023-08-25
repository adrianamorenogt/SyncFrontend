import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProposalGlobal{
    private _proposal:any;

    get proposal(): any {
        return this._proposal;
      }
      set proposal(value: any) {
        this._proposal = value;
      }
}