import { ChangeDetectionStrategy } from '@angular/compiler';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { paginationInitialState } from 'src/app/core/classes/pagination';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('pagination',{static:true}) pagination:Paginator
  @Input() totalItems: number
  // @Input() currentPage: number = 1;
  @Output() paginationChanged = new EventEmitter();

  pagesArrOptions=[]

  currentActivePage={page:1}

  paginationState: paginationState = paginationInitialState 


  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if( changes['totalItems']){
      this.pagination.totalRecords = changes['totalItems'].currentValue
      this.getPagesCountList(this.pagination.getPageCount())
      
    }
  }
  
  ngAfterViewInit(): void {
    // console.log(this.pagination.getPageCount())

  }

  getPagesCountList(pageCount){
    if(pageCount != Infinity){
      for(let i=1; i<= pageCount; i++){
        this.pagesArrOptions.push({page: i})
      }
    }

  }

  next(state: paginationState) {

    this.paginationState.first = this.paginationState.first + this.paginationState.rows;
    this.paginationState.page = this.paginationState.page + 1 //state.page => current page index 1,2,3,.. adding 1 to start with (0,1,2,..)
    this.onPageChange(this.paginationState)
  }

  prev(state: paginationState) {
    this.paginationState.first = this.paginationState.first -  this.paginationState.rows;
    this.paginationState.page = this.paginationState.page - 1 //state.page => current page index 1,2,3,.. adding 1 to start with (0,1,2,..)
    this.onPageChange(this.paginationState)
  }

  reset() {
    this.paginationState.first = 0;
    this.paginationState.page = 1
    this.onPageChange(this.paginationState)
  }

  isLastPage(): boolean {
    return this.totalItems ?
      (this.paginationState.first >= this.totalItems -  this.paginationState.rows) :
      true;
  }

  isFirstPage(): boolean {
    return this.totalItems ? this.paginationState.first === 0 : true;
  }


  jupmToPage(state, page){
    this.paginationState.page= page
    this.paginationState.first
    // this.onPageChange(this.paginationState)
    this.pagination.changePage(page)
    // console.log(state);

    // console.log(page);

  }


  onPageChange(event: paginationState) {
    console.log(event);
    this.paginationState = { ...this.paginationState, ...event }
    this.paginationChanged.emit(event)
  }

}
