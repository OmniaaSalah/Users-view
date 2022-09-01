import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexesRoutingModule } from './indexes-routing.module';
import { EditNewIndexComponent } from './components/edit-new-Index/edit-new-index.component';
import { IndexesComponent } from './components/View-List-Of-Indexes/indexes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { PrimngModule } from 'src/app/modules/primng/primng.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditNewIndexComponent,IndexesComponent
  ],
  imports: [
    CommonModule,
    IndexesRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxPaginationModule,
    PrimngModule,
    TranslateModule,
    SharedModule,
    
  ]
})
export class IndexesModule { }
