import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolsListComponent } from './components/schools-list/schools-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SchoolsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ]
})
export class SchoolsModule { }
