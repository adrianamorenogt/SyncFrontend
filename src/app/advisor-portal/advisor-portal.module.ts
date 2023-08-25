import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorPortalRoutes } from './advisor-portal.routes';
import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { AdvisorPortalComponent } from './advisor-portal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ListOfReceivedComponent } from './list-of-received/list-of-received.component';
import { MatTableExporterModule } from 'mat-table-exporter';


@NgModule({
    declarations: [
        AdvisorPortalComponent,
        ListOfReceivedComponent,    
    ],
    imports: [ 
        CommonModule,
        AdvisorPortalRoutes,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableExporterModule
    ],
    exports: [],
    providers: [CookieService],
})
export class AdvisorPortalModule {}