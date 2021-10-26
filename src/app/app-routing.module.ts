import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from './pages/body/body.component';
import { AuthComponent } from './pages/auth/auth.component';
import { EditorComponent } from './pages/editor/editor.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/inspect', pathMatch: 'full' },
  { path: 'inspect', component: BodyComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
