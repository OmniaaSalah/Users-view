import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolTrackComponent } from './school-track.component';

const routes: Routes = [{ path: '', component: SchoolTrackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolTrackRoutingModule { }
