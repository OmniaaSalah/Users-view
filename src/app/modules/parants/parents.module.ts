import { NgModule } from '@angular/core';
import { ParentsRoutingModule } from './parents-routing.module';
import { ParantsComponent } from './components/parents-list/parants.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { ChildrenListComponent } from './components/children-list/children-list.component';
import { ChildDetailsComponent } from './components/child-details/child-details.component';
import { UnregisterChildComponent } from './components/unregister-child/unregister-child.component';
import { FeaturesSharedModule } from '../shared/features-shared.module';
import { ParentService } from './services/parent.service';
import { ChildRequestsComponent } from './components/unregister-child/child-requests/child-requests.component';



@NgModule({
  declarations: [
    ParantsComponent,
    ChildrenListComponent,
    ChildDetailsComponent,
    UnregisterChildComponent,
    ChildRequestsComponent
  ],
  imports: [
    ParentsRoutingModule,
    SharedModule,
    PrimngModule,
    FeaturesSharedModule
  ],
  providers: [ParentService]
})
export class ParantsModule { }

