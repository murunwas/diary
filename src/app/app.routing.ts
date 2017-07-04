import { AuthGuard } from './shared/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  { path: '', canActivate:[AuthGuard], component: HomeComponent },
   { path: 'profile', canActivate:[AuthGuard], component: ProfileComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [HomeComponent,LoginComponent,ProfileComponent];
