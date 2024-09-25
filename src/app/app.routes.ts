import { Routes } from '@angular/router';
import { ContactLandingComponent } from './Components/contact-landing/contact-landing.component';
import { ContactGroupLandingComponent } from './Components/contact-group-landing/contact-group-landing.component';

export const routes: Routes = [
    {path:"",component:ContactLandingComponent},
    {path:"contacts",component:ContactLandingComponent},
    {path:"groups",component:ContactGroupLandingComponent},
    
];
