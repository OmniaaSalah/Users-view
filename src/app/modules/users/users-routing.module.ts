import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users-list/users.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
const routes: Routes = [

    {
      path: '',
      component: UsersComponent,
      data: { icon: "handshake.svg", title: 'Users List'} // This is the page title showing in the tab (in browser)
    },
    {
      path: 'user-details/:id',
      component: UserDetailsComponent,
      data: { icon: "handshake.svg", title: 'User Details'} // This is the page title showing in the tab (in browser)
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
