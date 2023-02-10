import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewChildRoutingModule } from './add-new-child-routing.module';
import { WithIdentityComponent } from './with-identity/with-identity.component';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { WithoutIdentityComponent } from './without-identity/without-identity.component';

@NgModule({
  declarations: [
    WithIdentityComponent,
    WithoutIdentityComponent
  ],
  imports: [
    CommonModule,
    AddNewChildRoutingModule,
    CommonModule,
    AddNewChildRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
    ToastrModule
  ]
})
export class AddNewChildModule { }
