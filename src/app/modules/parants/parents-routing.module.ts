import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterRequestComponent } from 'src/app/shared/components/register-request/register-request.component';
import { RouteEnums } from 'src/app/shared/enums/route/route.enum';
import { IssuanceOfACertificateComponent } from '../students/components/issuance-of-a-certificate/issuance-of-a-certificate.component';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { ChildrenListComponent } from './components/children-list/children-list.component';
import { ParantsComponent } from './components/parents-list/parants.component';
import { UnregisterChildComponent } from './components/unregister-child/unregister-child.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Layout } from 'src/app/layout/layout-routing.service';

const routes: Routes = [

  Layout.childRoutes([
    {
       path: '', component: ParantsComponent,
       data:{
        RouteKey: RouteEnums.Guardians,
        title:{ar:'اولياء الأمور',en: 'Guardians'}
      }
    },

    {
       path: 'parent/:parentId/all-children', component: ChildrenListComponent,
       data:{
        title:{ar:'قائمه الابناء',en: 'Children List'}
      }
    },

    {
       path: 'parent/:parentId/child/:childId', component: ChildDetailsComponent,
       data:{
        title:{ar:'تفاصيل الابن',en: 'Child Details'}
      }
    },

    {
       path: 'parent/:parentId/child/:childId/IssuanceOfACertificateComponent', component:IssuanceOfACertificateComponent ,
       data:{
        title:{ar:'الشهادات',en: 'Certificates'}
      }
    },

    {
       path: 'parent/:parentId/child/:id/unregister-child', component: UnregisterChildComponent,
       data:{
        title:{ar:'تفاصيل الابن',en: 'Child Details'}
      }
    },

    {
       path: 'parent/:parentId/child/:childId/register', component: RegisterRequestComponent,
       data:{
        title:{ar:'طلب تسجيل',en: 'Register Request'}
      }
    }
  ])

  // { path: 'parent/:parentId/child/:childId/register', loadChildren: () => import('./components/spea-register-child/spea-register-child.module').then(m => m.SpeaRegisterChildModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentsRoutingModule { }
