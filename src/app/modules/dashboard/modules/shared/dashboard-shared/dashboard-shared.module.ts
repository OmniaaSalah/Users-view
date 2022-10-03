import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterChildComponent } from '../components/register-child/register-child.component';
import { TranslateModule } from '@ngx-translate/core';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchoolsComponent } from '../components/schools/schools.component';




@NgModule({
  declarations: [ RegisterChildComponent, SchoolsComponent,],
  imports: [
    CommonModule,
    TranslateModule,
    PrimngModule,
    SharedModule,
    ReactiveFormsModule,

  ],
  exports:[RegisterChildComponent,SchoolsComponent]
})
export class DashboardSharedModule { }
