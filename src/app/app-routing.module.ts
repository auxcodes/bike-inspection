import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from './pages/body/body.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inspect', pathMatch: 'full' },
  {
    path: 'inspect',
    component: BodyComponent,
    canActivate: [AuthGuard]
  },
  { path: 'auth', component: AuthComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
