import { NgModule ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolGradeRoutingModule } from './school-grade-routing.module';
import { SchoolGradeComponent } from './school-grade.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SchoolGradeComponent
  ],
  imports: [
    CommonModule,
    SchoolGradeRoutingModule,
    SharedModule,
    PrimngModule,
    TranslateModule
  ]
})
export class SchoolGradeModule { 

}
