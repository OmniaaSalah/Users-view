import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolTrackRoutingModule } from './school-track-routing.module';
import { SchoolTrackComponent } from './school-track.component';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SchoolTrackComponent
  ],
  imports: [
    CommonModule,
    SchoolTrackRoutingModule,
    PrimngModule,
    SharedModule
  ]
})
export class SchoolTrackModule { }
