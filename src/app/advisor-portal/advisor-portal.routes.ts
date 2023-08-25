import { Routes, RouterModule } from '@angular/router';
import { AdvisorPortalComponent } from './advisor-portal.component';
import { ListOfReceivedComponent } from './list-of-received/list-of-received.component';

const routes: Routes = [
    {
        path: 'ap',
        component: AdvisorPortalComponent,
        children: [
            { path: 'list-of-received', component: ListOfReceivedComponent, data: { titulo: 'Propuestas recibidas' }},
        ]
    },
    
];
export const AdvisorPortalRoutes = RouterModule.forChild(routes); {}
