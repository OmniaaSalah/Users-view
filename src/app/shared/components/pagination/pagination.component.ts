import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { paginationInitialState } from 'src/app/core/classes/filtration';
import { paginationState } from 'src/app/core/models/pagination/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('pagination') pagination:Paginator
  @Input() id: string = 'pagination';
  @Input() showOrHide: boolean = true;
  @Input() disabled: boolean = false;
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  // @Input() itemsPerPageTextOrSelect:string = 'select';
  @Output() paginationChanged = new EventEmitter();

  first = 0
  rows = 4
  pagesArrOptions=[]

  currentActivePage={page:3}

  paginationState: paginationState = { ...paginationInitialState }


  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewInit(): void {

    this.getPagesCountList(this.pagination.getPageCount())
  }

  getPagesCountList(pageCount){

    for(let i=1; i<= pageCount; i++){
      this.pagesArrOptions.push({page: i})
    }     
  }

  next(state: paginationState) {

    this.paginationState.first = this.paginationState.first + this.rows;
    this.paginationState.page = state.page + 1 //state.page => current page index 1,2,3,.. adding 1 to start with (0,1,2,..)
    this.onPageChange(this.paginationState)
  }

  prev(state: paginationState) {
    this.paginationState.first = this.paginationState.first - this.rows;
    this.paginationState.page = state.page - 1 //state.page => current page index 1,2,3,.. adding 1 to start with (0,1,2,..)
    this.onPageChange(this.paginationState)
  }

  reset() {
    this.paginationState.first = 0;
    this.paginationState.page = 0
    this.onPageChange(this.paginationState)
  }

  isLastPage(): boolean {
    return this.totalItems ?
      (this.paginationState.first >= this.totalItems - this.rows) :
      true;
  }

  isFirstPage(): boolean {
    return this.totalItems ? this.paginationState.first === 0 : true;
  }


  jupmToPage(state, page){
    this.paginationState.page= page
    this.paginationState.first
    // this.onPageChange(this.paginationState)
    this.pagination.changePage(page -1)
    // console.log(state);
    
    // console.log(page);
    
  }


  onPageChange(event: paginationState) {
    console.log(event);

    this.first = event.first
    this.rows = event.rows

    this.paginationState = { ...this.paginationState, ...event }
    this.paginationChanged.emit(event)
  }

}
