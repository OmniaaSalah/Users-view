import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { paginationInitialState } from 'src/app/core/classes/filtaration';
import { paginationState } from 'src/app/core/Models/pagination/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit,OnChanges {
  
  @Input() id:string = 'pagination';
  @Input() showOrHide:boolean = true;
  @Input() disabled:boolean = false;
  @Input() totalItems:number = 0;
  @Input() currentPage:number = 1;
  // @Input() itemsPerPageTextOrSelect:string = 'select';
  @Output() paginationChanged = new EventEmitter();
  
  first=0
  rows =4

  paginationState: paginationState = {...paginationInitialState}

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  next(state:paginationState) {

    this.paginationState.first = this.paginationState.first + this.rows;
    this.paginationState.page = state.page + 1 //state.page => current page index 1,2,3,.. adding 1 to start with (0,1,2,..)
    this.onPageChange(this.paginationState)
	}

	prev(state:paginationState) {
		this.paginationState.first = this.paginationState.first - this.rows;
    this.paginationState.page = state.page - 1 //state.page => current page index 1,2,3,.. adding 1 to start with (0,1,2,..)
    this.onPageChange(this.paginationState)
	}

	reset() {
		this.paginationState.first = 0;
    this.paginationState.page=0
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

  onPageChange(event:paginationState){
        console.log(event);
        
    this.first = event.first
    this.rows = event.rows
    
    this.paginationState = {...this.paginationState, ...event}
    this.paginationChanged.emit(event)
  }

}
