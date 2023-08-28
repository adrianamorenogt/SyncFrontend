import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInForConsultationComponent } from './log-in-for-consultation/log-in-for-consultation.component';
import { KindOfConsultationComponent } from './kind-of-consultation/kind-of-consultation.component';
import { ConsultationByPersonComponent } from './consultation-by-person/consultation-by-person.component';
import { MultipleConsultationComponent } from './multiple-consultation/multiple-consultation.component';
import { MultipleConsultationGeneratedComponent } from './multiple-consultation-generated/multiple-consultation-generated.component';
import { NotFoundPersonComponent } from './not-found-person/not-found-person.component';
import { FoundPersonComponent } from './found-person/found-person.component';
import { PublicPagesRoutes } from './public-pages.routes';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { PublicPagesComponent } from './public-pages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ProposalReceivedComponent } from './proposal-received/proposal-received.component';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { HomeComponent } from './home/home.component';
import { ClientIndividualConsultationComponent } from './client-individual-consultation/client-individual-consultation.component';


@NgModule({
    declarations: [
        LogInForConsultationComponent,
        KindOfConsultationComponent,
        ConsultationByPersonComponent,
        MultipleConsultationComponent,
        MultipleConsultationGeneratedComponent,
        NotFoundPersonComponent,
        FoundPersonComponent,
        PublicPagesComponent,
        ProposalReceivedComponent,
        HomeComponent,
        ClientIndividualConsultationComponent,

    ],
    imports: [
        CommonModule,
        PublicPagesRoutes,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        ReusableComponentsModule

    ],
    exports: [],
    providers: [CookieService],
})
export class PublicPagesModule { }