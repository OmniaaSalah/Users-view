import { NgModule } from '@angular/core';
import { IndexesRoutingModule } from './indexes-routing.module';
import { EditNewIndexComponent } from './components/edit-new-Index/edit-new-index.component';
import { IndexesComponent } from './components/indexes-list/indexes-list.component';
import { PrimngModule } from 'src/app/shared/primng/shared-primng.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditNewIndexComponent, IndexesComponent
  ],
  imports: [
    IndexesRoutingModule,
    PrimngModule,
    SharedModule,

  ]
})
export class IndexesModule { }
