import { ChangeDetectionStrategy } from '@angular/core';
import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { paginationInitialState } from 'src/app/core/classes/pagination';

import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { TranslationService } from 'src/app/core/services/translation/translation.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, AfterViewInit {

  @ViewChild('pagination',{read: Paginator,static:true}) pagination:Paginator
  @Input() totalItems: number
  @Input() currentPage: number = 1;
  @Output() paginationChanged = new EventEmitter();

  lang = inject(TranslationService).lang

  PageReport

  pagesArrOptions=[]


  paginationState: paginationState = paginationInitialState


  firstPage
  lastPage
  get isFirstPage() {return this.pagination.isFirstPage()}
  get isLastPage () {return this.pagination.isLastPage()}

  ngOnInit(): void {
    this.setPaginagationReport()
    this.initPaginationState()
  }

  initPaginationState(){
    this.currentPage===1 ? this.paginationState.first=0 : this.paginationState.first = this.getFirstIndexInPages(this.currentPage)
    this.paginationState.page=this.currentPage

  }

  getFirstIndexInPages(page:number){
    if(page && page==1) return 0
    let arr =[]
    for(let i=1 ; i<= this.totalItems ;i++){
      arr.push(i)
    }

    return ( (page * this.paginationState.rows) - (this.paginationState.rows - 1) ) -1

  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['totalItems'] && !changes['totalItems']?.firstChange){
      this.currentPage =1
      this.paginationState.page = 1
      this.paginationState.first=0
      this.pagination.totalRecords = this.totalItems
      this.setPaginagationReport()
      this.ngAfterViewInit()
      console.log(this.pagination, this.pagination.isFirstPage());
    }

  }


  setPaginagationReport(){
    this.PageReport={
      ar:`إظهار {first} إلى {last} من أصل  ${this.totalItems}`,
      en:`Show {first} - {last} from ${this.totalItems} Of total Items`
    }
  }

  ngAfterViewInit(): void {
    this.getPagesCountList(this.pagination.getPageCount())
  }

  getPagesCountList(pageCount){
    this.pagesArrOptions=[]
    if(pageCount != Infinity){
      for(let i=1; i<= pageCount; i++){
        this.pagesArrOptions.push(i)
      }
    }

  }

  next(state: paginationState) {

    console.log(this.paginationState.first);

    this.paginationState.first = this.paginationState.first + this.paginationState.rows;
    this.paginationState.page = this.paginationState.page + 1 //state.page => current page index 1,2,3,.. adding 1 to start with (0,1,2,..)
    this.currentPage=this.paginationState.page;
    this.onPageChange(this.paginationState)
  }

  prev(state: paginationState) {
    this.paginationState.first = this.paginationState.first -  this.paginationState.rows;
    this.paginationState.page = this.paginationState.page - 1 //state.page => current page index 1,2,3,.. adding 1 to start with (0,1,2,..)
   this.currentPage=this.paginationState.page;
    this.onPageChange(this.paginationState)
  }

  reset() {
    this.paginationState.first = 0;
    this.paginationState.page = 1;
    this.onPageChange(this.paginationState)
  }

  // isLastPage(): boolean {
  //   return this.pagination.isLastPage()
  //   return this.totalItems ? (this.paginationState.first >= this.totalItems -  this.paginationState.rows) :true;
  // }

  // isFirstPage(): boolean {
  //   return this.pagination.isFirstPage()
  //   return this.totalItems ? this.paginationState.first === 0 : true;
  // }


  jupmToPage(state, page){


    this.pagination.changePage(page-1);
    this.paginationState.page= page;
    this.onPageChange(this.paginationState);


  }


  onPageChange(event: paginationState) {
    this.paginationState = { ...this.paginationState, ...event }
    this.paginationChanged.emit(event)
  }

}
