import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubjectsRoutingModule } from './subjects-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { SubjectsComponent } from './components/ViewAllSubject/subjects.component';
import { NewSubjectComponent } from './components/new-subject/new-subject.component';



@NgModule({
  declarations: [SubjectsComponent,NewSubjectComponent],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    PrimngModule,
   SharedModule ,

  ]
})
export class SubjectsModule { }
