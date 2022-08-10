import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (a) => a.AuthenticationModule
      )
  },

  {
    path: 'schools', 
    loadChildren: () => import('./modules/schools/schools.module').then((m) => m.SchoolsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
