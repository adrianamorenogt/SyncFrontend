import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ClientIndividualConsultationComponent } from './client-individual-consultation/client-individual-consultation.component';
import { ConsultationByPersonComponent } from './consultation-by-person/consultation-by-person.component';
import { FoundPersonComponent } from './found-person/found-person.component';
import { HomeComponent } from './home/home.component';
import { KindOfConsultationComponent } from './kind-of-consultation/kind-of-consultation.component';
import { LogInForConsultationComponent } from './log-in-for-consultation/log-in-for-consultation.component';
import { MultipleConsultationGeneratedComponent } from './multiple-consultation-generated/multiple-consultation-generated.component';
import { MultipleConsultationComponent } from './multiple-consultation/multiple-consultation.component';
import { NotFoundPersonComponent } from './not-found-person/not-found-person.component';
import { ProposalReceivedComponent } from './proposal-received/proposal-received.component';
import { PublicPagesComponent } from './public-pages.component';


const routes: Routes = [

    {
        path: 'pb',
        component: PublicPagesComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            { path: 'home', component: HomeComponent, data: { titulo: '' } },
            { path: 'client-consultation', component: ClientIndividualConsultationComponent, data: { titulo: '' } },
            { path: 'log-in-for-consultation', component: LogInForConsultationComponent, data: { titulo: '' } },
            { path: 'kind-of-consultation', component: KindOfConsultationComponent, canActivate: [AuthGuard], data: { titulo: '' } },
            { path: 'consultation-by-person', component: ConsultationByPersonComponent, data: { titulo: '' } },
            { path: 'not-found-person', component: NotFoundPersonComponent, data: { titulo: '' } },
            { path: 'found-person', component: FoundPersonComponent, data: { titulo: '' } },
            { path: 'multiple-consultation', component: MultipleConsultationComponent, canActivate: [AuthGuard], data: { titulo: '' } },
            { path: 'multiple-consultation-generated', component: MultipleConsultationGeneratedComponent, data: { titulo: '' } },
            { path: 'proposal-received', component: ProposalReceivedComponent, data: { titulo: '' } },
        ],
    },

];


export const PublicPagesRoutes = RouterModule.forChild(routes); { }
