import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IHeader } from 'src/app/core/Models';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { SchoolsService } from 'src/app/modules/schools/services/schools/schools.service';
import { StudentsService } from 'src/app/modules/students/services/students/students.service';
import { FileTypeEnum } from 'src/app/shared/enums/file/file.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { ExportService } from 'src/app/shared/services/export/export.service';

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss']
})
export class EditHistoryComponent implements OnInit {

  currentUserScope = inject(UserService).getScope()
  get userScope() { return UserScope }
  lang = inject(TranslationService).lang

  editItem;
  currentSchool="";

  schoolId = this.route.snapshot.paramMap.get('schoolId')

  componentHeaderData: IHeader = {
		breadCrump: [

			{ label: this.translate.instant('dashboard.schools.editableList'), routerLink: `/school-management/school/${this.schoolId}/edit-list`},
		],
		mainTitle: { main: this.currentSchool }
	}


  faChevronCircleLeft = faChevronLeft

  filtration={...Filtration}
  paginationState={...paginationInitialState}

  editList={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  openEditListModel=false

  constructor(
    private translate:TranslateService,
    private schoolsService:SchoolsService,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private userService:UserService,
    private exportService :ExportService
  ) { }

  ngOnInit(): void {
    this.getEditList()
  }

  getEditList(){
    this.editList.loading=true
    this.editList.list=[]
    this.schoolsService.getSchoolEditList(this.filtration).subscribe(res =>{
      this.editList.loading = false
      this.editList.list = res.data || []
      this.editList.totalAllData = res.totalAllData ||0
      this.editList.total =res.total || 0
    },(err)=>{
      this.editList.loading = false;
      this.editList.total=0
     })
  }



  onSort(e){
    if(e.order==1) this.filtration.SortBy= 'old'
    else if(e.order == -1) this.filtration.SortBy= 'update'
    this.filtration.Page=1;
     this.getEditList()
   }

   clearFilter(){
     this.filtration.KeyWord =''
     this.filtration.Page=1;
     this.getEditList()
   }


   onExport(fileType: FileTypeEnum){
    let filter = {...this.filtration,PageSize:this.editList.totalAllData,Page:1}
    this.schoolsService.editListToExport(filter).subscribe( (res) =>{

      this.exportService.exportFile(fileType, res, this.translate.instant('dashboard.schools.editableList'))
    })
  }

   paginationChanged(event: paginationState) {
     this.filtration.Page = event.page
     this.getEditList()

   }
   showDetails(id)
   {
    this.schoolsService.getDetailsOfEditItem(id).subscribe((res)=>{this.editItem=res})
   }

}
