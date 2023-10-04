import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchModel } from '../../models/filter-search/filter-search.model';
import { paginationState } from '../../models/pagination/pagination.model';
import { paginationInitialState } from '../../helpers/pagination';

@Injectable({
  providedIn: 'root'
})
export abstract class FilterSearchService {

  public searchModel :SearchModel
  paginationState= {...paginationInitialState}

  constructor(
    protected route:ActivatedRoute,
    protected router:Router,
    searchModel?:SearchModel,
    ){

    this.searchModel = {...searchModel, ...JSON.parse(this.route.snapshot.queryParams['searchQuery'] || 'null')}

  }

  saveSearchQuery(){
    if(this.route.snapshot.queryParams['searchQuery']){
      this.searchModel = {...JSON.parse(this.route.snapshot.queryParams['searchQuery']), ...this.searchModel}
    }
    this.router.navigate([], {
      queryParams: {searchQuery : JSON.stringify(this.searchModel)},
      relativeTo: this.route,
    });
  }


  resetFilter(cbFn){
    for(let key in this.searchModel){
      this.searchModel[key] = null
    }
    this.searchModel.PageSize=6
    this.searchModel.Page=1;
    cbFn()
  }


  onSort(event, cbFn){
    this.searchModel.SortColumnName=event.field
    if(event.order==1) this.searchModel.SortBy= 'Asc'
    else if(event.order == -1) this.searchModel.SortBy= 'Desc'
    this.searchModel.Page=1;
    cbFn()
  }

  onPaginationChanged(event: paginationState, cbFn){
    this.searchModel.Page = event.page
    this.searchModel.PageSize = event.rows
    cbFn()
  }
}
