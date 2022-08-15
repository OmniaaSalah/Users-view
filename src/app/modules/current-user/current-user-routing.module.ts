import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentUserComponent } from './current-user.component';

const routes: Routes = [
  {
    path: '', 
    component:CurrentUserComponent ,
    children: [
      {
        path:'parents' ,
        loadChildren: ()=>import('./components/parents/parents.module').then( m  => m.ParentsModule)
      },
      {
        // path:'sharjah-authourity' ,
        path:'',
        loadChildren: ()=>import('./components/sharjah-authority/sharjah-authority.module').then( m  => m.SharjahAuthorityModule)
      },
      {
        path:'school' ,
        loadChildren: ()=>import('./components/school/school.module').then( m  => m.SchoolModule)
      },
    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentUserRoutingModule { }
