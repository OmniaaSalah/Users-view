import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PrimngModule } from '../primng/primeNg.module';
import { InformativeBlockComponent } from './components/informative-block/informative-block.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import localeAr from '@angular/common/locales/ar';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { StopPropagationDirective } from './directives/stop-propagation/stop-propagation.directive';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NumberRestrictionDirective } from './directives/number-restriction/number-restriction.directive';

registerLocaleData(localeAr);


@NgModule({
  declarations: [

    PaginationComponent,
    InformativeBlockComponent,
    SkeletonComponent,
    StopPropagationDirective,
    NumberRestrictionDirective
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    PrimngModule,
    NgxSkeletonLoaderModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule,
    ToastrModule,

  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    PaginationComponent,
    InformativeBlockComponent,
    NgxSkeletonLoaderModule,
    SkeletonComponent,
    StopPropagationDirective,
    RouterModule,
    ToastrModule,
    NumberRestrictionDirective
  ],
  providers:[]
})
export class SharedModule { }
