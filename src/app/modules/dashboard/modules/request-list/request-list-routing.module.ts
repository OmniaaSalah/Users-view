import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { RequestListComponent } from './Component/request-list/request-list.component';
import { RequestdetailsComponent } from './Component/requestdetails/requestdetails.component';

const routes: Routes = [
  { path: "", component:RequestListComponent ,data:{ RouteKey: RouteEnums.Requests}},
  {path:"details/:id",component:RequestdetailsComponent},

  { path: "my-requests", component:RequestListComponent ,data:{ RouteKey: RouteEnums.MyRequests}},
  { path: "my-requests/details/:id", component:RequestListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestListRoutingModule { }
