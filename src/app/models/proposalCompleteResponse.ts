import { proposalResponseModel } from "./proposalRespModel";

export class proposalCompleteResponse{
    proposal:proposalResponseModel = new proposalResponseModel();
    base64FileCSV:String = "";
    operationCode:number = 0;
    operationMessage:String = "";

}