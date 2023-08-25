import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DebtProjectionComponent } from './dialogs/debt-projection/debt-projection.component';
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailProposalComponent } from './dialogs/detail-proposal/detail-proposal.component';
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { ProgressFileUploadComponent } from "./file-upload/progress-file-upload/progress-file-upload.component";
import { ClientAuthorizationComponent } from './dialogs/client-authorization/client-authorization.component';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { MultipleProposalExplicationComponent } from './dialogs/multiple-proposal-explication/multiple-proposal-explication.component';
import { PasswordResetComponent } from './dialogs/password-reset/password-reset.component';
import { ChangePasswordComponent } from './dialogs/change-password/change-password.component';
import { RegisterFormComponent } from './dialogs/register-form/register-form.component';
import { UserNotRegisterComponent } from './dialogs/user-not-register/user-not-register.component';

@NgModule ({
    declarations:[
        DebtProjectionComponent,
        FileUploadComponent,
        ProgressFileUploadComponent,
        DetailProposalComponent,
        ClientAuthorizationComponent,
        MultipleProposalExplicationComponent,
        PasswordResetComponent,
        ChangePasswordComponent,
        RegisterFormComponent,
        UserNotRegisterComponent
    ],

    exports:[
        FileUploadComponent,
        ProgressFileUploadComponent,
    ],

    imports:[
        MaterialModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        PdfViewerModule
    ],
})

export class ReusableComponentsModule{
}