import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsListComponent } from './components/schools-list/schools-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { SchoolsRoutingModule } from './schools.routing.module';



@NgModule({
  declarations: [
    SchoolsListComponent
  ],
  imports: [
    CommonModule,
    SchoolsRoutingModule,
    SharedModule,
    TranslateModule
  ]
})
export class SchoolsModule { }
