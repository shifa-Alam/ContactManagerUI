import { Routes } from '@angular/router';
import { ContactLandingComponent } from './Components/contact-landing/contact-landing.component';
import { ContactGroupLandingComponent } from './Components/contact-group-landing/contact-group-landing.component';
import { ContactTypeLandingComponent } from './Components/contact-type-landing/contact-type-landing.component';

export const routes: Routes = [
    {path:"",component:ContactLandingComponent},
    {path:"contacts",component:ContactLandingComponent},
    {path:"groups",component:ContactGroupLandingComponent},
    {path:"types",component:ContactTypeLandingComponent},
    
];
