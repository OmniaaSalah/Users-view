import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Filtration } from 'src/app/core/helpers/filtration';
import { FileTypeEnum } from '../../enums/file/file.enum';
import { SharedService } from '../../services/shared/shared.service';
import { ExportService } from '../../services/export/export.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table-caption',
  templateUrl: './table-caption.component.html',
  styleUrls: ['./table-caption.component.scss']
})
export class TableCaptionComponent implements OnInit, OnDestroy {
  loadingFilter: boolean=false;
  showExportLoader$= this.exportService.showLoader$

  serachPlacholder= this.translate.instant('shared.Search...')

  @Input() hasFilter:boolean=true
  @Input() hasExport:boolean=true
  @Input() hasSearch:boolean=true
  @Input() set seachKeyword(text){
    this.searchInput.setValue(text)
  }
  @Input()  set searchByList(list:[]){
    let prefex =  this.translate.instant('shared.Search...')
    if(list && list.length ){
      let searchByListStr = list.join(' , ')
      this.serachPlacholder = `${prefex} ( ${searchByListStr} )`
    }

  }

  @Input() template :TemplateRef<any>
  @Input('size') small:string;
  @Input() styles ={};
  @Output() onExport = new EventEmitter();
  @Output() onSearch = new EventEmitter();
  @Output() onFilter = new EventEmitter();
  @Output() onClear = new EventEmitter();
  ngUnSubscribe =new Subject()

  showExportModel:boolean=false;
  // showFilterBox = false

  showFilterModel=false

  searchInput = new FormControl('')

  filterAppliedCount$ = this.sharedService.appliedFilterCount$

  constructor(
    private sharedService:SharedService,
    private exportService:ExportService,
    private translate:TranslateService) { }


  ngOnInit(): void {
    this.exportService.showLoader$.subscribe(val=>{
      if(val) this.showExportModel = false
    })
    this.sharedService.filterLoading.subscribe((res)=>this.loadingFilter=res)
    this.seachListener()
  }


  seachListener()
  {
    this.searchInput.valueChanges
    .pipe(
      debounceTime(1200),
      distinctUntilChanged(),
      takeUntil(this.ngUnSubscribe)
    )
    .subscribe(val =>{
      this.onSearch.emit(val?.trim());
    })
  }

  onFilterActivated(){
    this.sharedService.filterLoading.next(true);
    this.showFilterModel=!this.showFilterModel
    Filtration.Page = 1
    this.onFilter.emit()

  }

  clearFilter(){this.showFilterModel = false; this.onClear.emit()}

  exportPdf() { this.onExport.emit(FileTypeEnum.Pdf)}

  exportXslx(){ this.onExport.emit(FileTypeEnum.Xlsx) }


  ngOnDestroy(): void {
    this.ngUnSubscribe.next(null)
    this.ngUnSubscribe.complete()
  }
}
