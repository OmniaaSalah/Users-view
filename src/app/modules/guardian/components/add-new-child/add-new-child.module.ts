import { NgModule } from '@angular/core';
import { AddNewChildRoutingModule } from './add-new-child-routing.module';
import { WithIdentityComponent } from './with-identity/with-identity.component';
import { PrimngModule } from 'src/app/primng/primeNg.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { WithoutIdentityComponent } from './without-identity/without-identity.component';

@NgModule({
  declarations: [
    WithIdentityComponent,
    WithoutIdentityComponent
  ],
  imports: [
    AddNewChildRoutingModule,
    AddNewChildRoutingModule,
    PrimngModule,
    SharedModule,
  ]
})
export class AddNewChildModule { }
