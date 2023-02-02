import { formatDate } from '@angular/common';
import { Component, OnInit,inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faArrowRight, faCheck , faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, SelectItem,PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { debounceTime, distinctUntilChanged, Subject, Subscription, takeUntil } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { ISendSurvey } from 'src/app/core/Models/Survey/ISendSurvey';

import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { FileEnum } from 'src/app/shared/enums/file/file.enum';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { ExportService } from 'src/app/shared/services/export/export.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { ParentService } from '../../../parants/services/parent.service';
import { SchoolYearsService } from '../../../school-years/service/school-years.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.scss']
})
export class SendSurveyComponent implements OnInit {
  answeredParents=[];
  subscription:Subscription;
  currentDate=new Date()
  isBtnLoading: boolean=false;
  guardianIds=[];
  editSurvey;
  get StatusEnum() { return StatusEnum }
  savedGuardianIds=[];
  sendSurvey :ISendSurvey  = <ISendSurvey>{};
  dropdownList = [];
  selectedItems = [];
  parentsList=[];
  dropdownSettings:IDropdownSettings;
  // userlist: parentsList[];
  selectedUser:'';
  minDateValue=new Date();
  faCheck = faCheck
  faArrowRight = faArrowRight
  faArrowLeft = faArrowLeft
  parentsModelOpened = false
  SendServeyModelOpened = false
  display: boolean = false;

  parenNametList=[];
  surveyFormGrp:FormGroup;
  exclamationIcon = faExclamationCircle;
  parent={
		totalAllData:0,
		total:0,
		list:[],
		loading:true
	  }


  step = 1
  schools$ = inject(SchoolsService).getAllSchools();
  AllGrades$ =inject(SharedService).getAllGrades('');
  clearFlag = false
  surveyId=this.route.snapshot.paramMap.get('surveyId');
  filtration :Filter = {...Filtration, emiretesId: '', SchoolId:'',gradeId:''}


  constructor(
    private schoolsService:SchoolsService,
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService,
    private primengConfig:PrimeNGConfig,
    private fb:FormBuilder,
    private surveyService: SurveyService,
    private exportService: ExportService,
    private sharedService: SharedService,
    private parentService : ParentService,
    private _router: ActivatedRoute,
    public confirmModelService: ConfirmModelService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
this.surveyFormGrp= this.fb.group({
  appearanceDate:[null, [Validators.required]],
  disAppearanceDate:[null, [Validators.required]],
  appearanceTime:[null, [Validators.required]],
  disAppearanceTime:[null, [Validators.required]],

})
    }

  ngOnInit(): void {
    
    // this.confirmDeleteListener();
  
    this.getSurveyById();
    // this.seachListener();
    this.getParentList();

  
   var date=new Date();
  

  }
  get appearanceDate() {
    return this.surveyFormGrp.controls['appearanceDate'] as FormControl;
  }

  get disAppearanceDate() {
    return this.surveyFormGrp.controls['disAppearanceDate'] as FormControl;
  }

  get appearanceTime() {
    return this.surveyFormGrp.controls['appearanceTime'] as FormControl;
  }

  get disAppearanceTime() {
    return this.surveyFormGrp.controls['disAppearanceTime'] as FormControl;
  }


     // << FORMS >> //
  
  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }

  addParents() {
 
    console.log(this.savedGuardianIds)
    
  

  }

  // selectedDate(e) {
  //   console.log(e);

  // }

  // openparentsModel() {
  //   this.parentsModelOpened = true
  // }
  // openSendServeysModel() {
  //   this.SendServeyModelOpened = true
  // }


  // showDialog() {
  //     this.display = true;
  // }
  showFilterModel=false
  searchInput = new FormControl('')
  curriculums$ = this.sharedService.getAllCurriculum();

  
  // onExport(fileType: FileEnum, table:Table){
   
  // }

  clearFilter(){
  
    
    this.filtration.KeyWord ='';
    this.filtration.gradeId = '';
    this.filtration.emiretesId='';
    this.filtration.SchoolId = '';
    
    this.getParentList();
  }
  // onFilterActivated(){
  //   this.showFilterModel=!this.showFilterModel;
 

  // }
  // ngUnSubscribe =new Subject()
  // seachListener(){
  //   this.searchInput.valueChanges
  //   .pipe(
  //     debounceTime(1200),
  //     distinctUntilChanged(),
  //     takeUntil(this.ngUnSubscribe)
  //   )
  //   .subscribe(val =>{
      
  //   })
  // }

  // getSchoolBycurriculumId(event){
  //   debugger;
  //   console.log(event);
  //   this.schools$ =  this.sharedService.getSchoolsByCurriculumId(event.value);
  // }
  getParentList() {
		// this.surveyService.getGuardians(this.filtration).subscribe(res => {
    //   console.log(res.data)
    //   this.parentsList = res.data})

      this.parent.loading=true
		this.parent.list=[]
    this.surveyService.getGuardians(this.filtration).subscribe(res => {
         if(res.data){

			this.parent.list = res.data
			this.parent.totalAllData = res.totalAllData
			this.parent.total =res.total
      this.parent.loading = false
	  
      }
		},err=> {
			this.parent.loading=false
			this.parent.total=0;

		  })
	  }
    
    // AddToTextArea(p){
    //   this.parenNametList.push({name : p.name.ar});
    //   this.guardianIds.push(p.id);
    // }
   

    SendSurvey(){
      this.isBtnLoading=true;
     
      var survey={
        "surveyId": Number(this.surveyId),
        "guardianIds": this.savedGuardianIds,
        "appearanceDate":this.formateDate(this.surveyFormGrp.value.appearanceDate),
        "disAppearanceDate":this.formateDate(this.surveyFormGrp.value.disAppearanceDate),
        "appearanceTime": this.formateDate(this.surveyFormGrp.value.appearanceTime),
        "disAppearanceTime": this.formateDate (this.surveyFormGrp.value.disAppearanceTime),
        "surveyLink": `http://localhost:4200/dashboard/educational-settings/surveys/reply-survey/${this.surveyId}`
      }

      this.surveyService.sendSurvey(survey).subscribe(response=>{
        this.isBtnLoading=false;
        if(response.statusCode!='BadRequest')
        {
          this.toastr.success(this.translate.instant('dashboard.surveys.survey sent Successfully'));
         this.router.navigateByUrl('/dashboard/educational-settings/surveys');
       }
       else
       {
        this.toastr.error(this.translate.instant("dashboard.surveys.Survey is send before"));
       }
       
      },(err)=>{
        this.isBtnLoading=false;
        this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));
      })
     

    }

    getSurveyById()
{
   this.editSurvey;

  this.surveyService.getSurveyById(Number(this.surveyId)).subscribe(response=>{

    this.editSurvey = response.result.result  ;
   
    this.surveyFormGrp.patchValue({
      disAppearanceDate:this.editSurvey.disApperanceDate?new Date(this.editSurvey.disApperanceDate) :null,
      appearanceDate:this.editSurvey.apperanceDate? new Date(this.editSurvey.apperanceDate):null,
      appearanceTime:this.editSurvey.apperanceDate? new Date(this.editSurvey.apperanceDate.split('+')[0]):null,
      disAppearanceTime: this.editSurvey.disApperanceDate? new Date(this.editSurvey.disApperanceDate.split('+')[0]):null

    })
    
    this.savedGuardianIds=this.editSurvey.targetGuardianIds;
    this.answeredParents=this.editSurvey.targetGuardiansModel;
  
  })

  
}



formateDate(date :Date)
{
  let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString() 
  return d.split('.')[0]
}

}
