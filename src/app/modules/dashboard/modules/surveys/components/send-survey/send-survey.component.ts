
import { Component, OnInit,inject,OnDestroy} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription} from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SchoolsService } from '../../../schools/services/schools/schools.service';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.scss']
})
export class SendSurveyComponent implements OnInit ,OnDestroy{
  exclamationIcon = faExclamationCircle;
  allSelectedGuardian=[];
  lang = inject(TranslationService).lang;
  guardianIds=[];
  currentDate=new Date()
  isBtnLoading: boolean=false;
  editSurvey;
  get StatusEnum() { return StatusEnum }
  savedGuardianIds=[];
  surveyFormGrp:FormGroup;
  parent={
		totalAllData:0,
		total:0,
		list:[],
		loading:true
	  }
  schools$ = inject(SchoolsService).getAllSchools();
  AllGrades$ =inject(SharedService).getAllGrades('');
  surveyId=this.route.snapshot.paramMap.get('surveyId');
  filtration = {...Filtration, emiretesId: '', schoolId:null,gradeId:null}
  subscription:Subscription;


  constructor(
    private translate: TranslateService,
    private fb:FormBuilder,
    private surveyService: SurveyService,
    private sharedService: SharedService,
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
    
    this.confirmDeleteListener();
  
    this.getSurveyById();
    
    this.filtration.Page=0;
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

  getParentList() {
		

    this.parent.loading=true
    this.filtration.Page +=1
    this.filtration.PageSize=4;
    this.surveyService.getGuardians(this.filtration).subscribe(res => {
    if(res.data){
      this.sharedService.filterLoading.next(false);
			this.parent.list.push(...res.data);
			this.parent.totalAllData = res.totalAllData
			this.parent.total =res.total
      this.parent.loading = false
    
      }
		},err=> {
			this.parent.loading=false
			this.parent.total=0;
      this.sharedService.filterLoading.next(false);

		  })
	  }
    
   

    SendSurvey(){
      this.isBtnLoading=true;
     
      var survey={
        "surveyId": Number(this.surveyId),
        "guardianIds": this.savedGuardianIds,
        "appearanceDate":this.formateDate(this.surveyFormGrp.value.appearanceDate),
        "disAppearanceDate":this.formateDate(this.surveyFormGrp.value.disAppearanceDate),
        "appearanceTime": this.surveyFormGrp.value.appearanceTime,
        "disAppearanceTime": this.surveyFormGrp.value.disAppearanceTime,
        // "surveyLink": `https://daleel-qa-app.azurewebsites.net/dashboard/educational-settings/surveys/reply-survey/${this.surveyId}`
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
    openMessage()
    {

      this.confirmModelService.openModel({message:this.translate.instant("dashboard.surveys.Are you sure you need yo send the survey ? You can’t edit on it later"),img:'assets/images/'});
    }

    confirmDeleteListener(){
  
      this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
        if (val) this.SendSurvey();
        
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
      appearanceTime:this.editSurvey.apperanceDate? new Date(this.editSurvey.apperanceDate):null,
      disAppearanceTime: this.editSurvey.disApperanceDate? new Date(this.editSurvey.disApperanceDate):null

    })
    
    this.savedGuardianIds=this.editSurvey.targetGuardianIds;
    
  
  })

  
}



formateDate(date :Date)
{
  let d = new Date(date.setHours(date.getHours() - (date.getTimezoneOffset()/60) )).toISOString() 
  return d.split('.')[0]
}

 currentApperanceTime()
 {
  if(!this.appearanceTime.value)
    {
      this.appearanceTime.setValue(new Date(this.appearanceDate.value))
    }

 }
 onScroll()
 {

   if(this.parent.list.length<this.parent.total){
 
       this.loadMore();
   }
 }

 loadMore()
 {
 
   this.getParentList();
 }

 selectAllParents(value)
 {
  
  if(value.checked)
  {
    this.allSelectedGuardian=this.parent.list.map(parent=>{return parent.id})
    this.savedGuardianIds=this.allSelectedGuardian
  }
  else
  {
    this.allSelectedGuardian=[];
    this.savedGuardianIds=this.allSelectedGuardian
  }
 }

 ngOnDestroy(): void {
      
  this.subscription.unsubscribe();
  this.confirmModelService.confirmModelData$.next(null)
  this.confirmModelService.confirmed$.next(null);
}

}
