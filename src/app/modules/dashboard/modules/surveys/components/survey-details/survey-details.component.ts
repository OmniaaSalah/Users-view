import {  Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowRight, faCheck, faChevronDown, faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import {IHeader } from 'src/app/core/Models/header-dashboard';
import { ISurveyQuestion } from 'src/app/core/Models/IAddSurvey';

import { IEditSurvey } from 'src/app/core/Models/IeditSurvey';
import { IEditNewSurvey, ISurveyQuestionEdit } from 'src/app/core/Models/Survey/IEditNewSurvey';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { QuestionsTypeEnum } from 'src/app/shared/enums/surveys/questions-type.enum';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AssessmentService } from '../../../assessment/service/assessment.service';
import { SurveyService } from '../../service/survey.service';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas'; 
import * as XLSX from 'xlsx';
import { TimeScale } from 'chart.js';
import { Subscription } from 'rxjs';
import { ConfirmModelService } from 'src/app/shared/services/confirm-model/confirm-model.service';

export interface Subject{
  Assessment:string
  deservingDegreesFrom:string
  deservingDegreesTo:string
  chronicDiseases:string
  status:string
}

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit,OnDestroy{
  subscription:Subscription;
  isBtnLoading: boolean=false;
  isSentBtnLoading:boolean=false;
  list=[];
  list2=[];
  savedSurvey;
  attachments=[];
  editNewSurvey: IEditNewSurvey = <IEditNewSurvey>{};
addsurveyQuestion: ISurveyQuestionEdit = <ISurveyQuestionEdit>{};
  showExportModel:boolean=false;
  questionArray=[]
  attachmentArray=[]
  currentQuestionNumber=0;
  questionType;
  showText:boolean=false;
  showFile:boolean=false;
  get StatusEnum() { return StatusEnum }
  selectedSurveyType : any;
  selectedSurveyQuestionType :any;
  surveyTypes;
  editSurvey;
  faCheck = faCheck
  surveyFormGrp: FormGroup;
  faChevronDown = faChevronDown
  dropdownList = [];
  selectedItems = [];
  cities: string[];
  choices: string[];
  step =1
  faPlus= faPlus;
  exclamationIcon = faExclamationCircle;
  righticon = faArrowRight;
  surveyTpe_SelectedItem=''
  faArrowRight = faArrowRight
  get QuestionsTypeEnum () {return QuestionsTypeEnum}

  surveyId=this.route.snapshot.paramMap.get('surveyId');
  targetsModalOpend = false
  responsesModalOpend = false


  
  _fileName :string[] = [];
  fileName = 'file.pdf'



  // get assesmentForm():FormArray{
  //   return this.surveyFormGrp.get('questions')  as FormArray
  // }  

get surveyQuestionType()
{
  return this.questions.controls['surveyQuestionType'] ;
}
  get questionChoice() {
    return this.questions.controls['questionChoice'] ;
  }
  get questions():FormArray
  { return this.surveyFormGrp.controls['questions'] as FormArray }
  
  get questionChoices():FormArray {
  
   
    return this.questions.controls['questionChoices'] as FormArray;
  }
  private getTranslateValue(key: string): string {
    return this.translate.instant(key);
  }
  get canAddSubjects(): boolean {
    return this.surveyFormGrp.get('questions').valid;
  }

  get surveyType() {
    return this.surveyFormGrp.controls['surveyType'] as FormControl;
  }

  get arabicSurveyTitle() {
  
    return this.surveyFormGrp.controls['arabicSurveyTitle'] as FormControl;
  }

  get englishSurveyTitle() {
    return this.surveyFormGrp.controls['englishSurveyTitle'] as FormControl;
  }

 

  constructor(
    public confirmModelService: ConfirmModelService,
    private translate: TranslateService,
    private headerService: HeaderService, private fb:FormBuilder,
    private surveyService: SurveyService,
    public translationService: TranslationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService) {const formOptions: AbstractControlOptions = {};
    this.surveyFormGrp = fb.group({
      surveyType: ['', [Validators.required]],
      arabicSurveyTitle: ['', [Validators.required,Validators.maxLength(200)]],
      englishSurveyTitle: ['', [Validators.required,Validators.maxLength(200)]],
      questions:fb.array([])

    }, formOptions);

  }
  ngOnInit(): void {
    this.confirmDeleteListener();
    this.questionType=this.surveyService.questionType;
    this.surveyTypes=this.surveyService.surveyType;
    if(this.surveyId!=null)
    {this.getSurveyById();}
    else
    {
      this.addNewQuestion();
    }
    this.headerService.Header.next(
      {
        breadCrump: [
          { label: this.translate.instant('dashboard.surveys.surveyList'),routerLink:'/dashboard/educational-settings/surveys' ,routerLinkActiveOptions:{exact: true}}
         ,{ 
               
            label: (this.surveyId==null||this.surveyId=='')?  this.translate.instant('dashboard.surveys.createNewSurvey'):this.translate.instant('dashboard.surveys.Survey Details'),
            routerLink: (this.surveyId==null||this.surveyId=='')? '/dashboard/educational-settings/surveys/new-survey':'/dashboard/educational-settings/surveys/Survey/'+this.surveyId
          }
        ],
        mainTitle:{main:(this.surveyId==null||this.surveyId=='')? this.translate.instant('dashboard.surveys.createNewSurvey'):this.translate.instant('dashboard.surveys.Survey Details')} 
      }
    );

  }


 

 


  addChoices(i)
  {
   
    var questionsFormGrp=this.questions.controls[i] as FormGroup
    var choicesFormArr=questionsFormGrp.controls['questionChoices'] as FormArray;
    // choicesFormArr.push(this.fb.control('',[Validators.required,Validators.maxLength(200)]))
    choicesFormArr.push( this.fb.group({
      arabicChoice: ['', [Validators.required,Validators.maxLength(200)]],
      englishChoice: ['',[Validators.required,Validators.maxLength(200)]]}))
 
   
  }



getSurveyById()
{
  this.surveyService.getSurveyById(Number(this.surveyId)).subscribe(response=>{

    this.editSurvey = response.result.result ;
    this.editSurvey.surveyQuestions.forEach((item,i)=>{

      this.addDatatoQuestion(item,i);

      if(this.editSurvey?.surveyStatus!=StatusEnum.Sent&&this.editSurvey?.surveyStatus!=StatusEnum.New&&this.surveyId)
      {
        // this.surveyQuestionType.enable();
      }

     })

    this.surveyFormGrp.patchValue({
      surveyType: this.editSurvey.surveyType,
      arabicSurveyTitle: this.editSurvey.surveyTitle.ar,
      englishSurveyTitle: this.editSurvey.surveyTitle.en
    })
  })

  
}

addDatatoQuestion(item,i){
  
  if(item.surveyQuestionType==QuestionsTypeEnum.SurveyMultiChoiceQuestion||item.surveyQuestionType==QuestionsTypeEnum.SurveyRateQuestion)
  {
    this.addQuestionInCaseInputChoices(item,i);
  }
  else if (item.surveyQuestionType==QuestionsTypeEnum.SurveyAttachmentQuestion||item.surveyQuestionType==QuestionsTypeEnum.SurveyFreeTextQuestion)
  {
    this.addQuestionInCaseInputFile(item,i);
  }

}
onFileUpload(event,i)
{
  var questionsFormGrp=this.questions.controls[i] as FormGroup
  var attachmentFormCtr=questionsFormGrp.controls['attachment']
  attachmentFormCtr.setValue(event[0])

  this.attachments[i]=event[0]
  console.log(event[0],i)
}
saveSurvey() {
  this.isBtnLoading=true;
 
  this.savedSurvey={
  'title':{ar:this.surveyFormGrp.value.arabicSurveyTitle,en:this.surveyFormGrp.value.englishSurveyTitle},
  'surveyType':this.surveyFormGrp.value.surveyType,
  'surveyQuestions':this.surveyFormGrp.value.questions.map((question,i)=>{return {
    'surveyQuestionType':question.surveyQuestionType,
    'questionText':{ar:question.arabicQuestionText,en:question.englishQuestionText},
    'questionChoices':question.questionChoices.map((choice)=>{return {
      ar:choice.arabicChoice,
      en:choice.englishChoice
    }}),
    'attachment':this.attachments[i],

     }})
};
  
  if(!this.surveyId)
  {
this.surveyService.addSurvey(this.savedSurvey).subscribe((res)=>{
  
  this.isBtnLoading=false;
  this.toastr.success(this.translate.instant('dashboard.surveys.survey added Successfully'));
  this.router.navigateByUrl(`/dashboard/educational-settings/surveys/Survey/${res.result.createdSurveyId}`);
},(err)=>{ this.isBtnLoading=false;
    this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));})
  }
  else
  {
    this.surveyService.editsurvey(this.savedSurvey,Number(this.surveyId)).subscribe((res)=>{
      this.isBtnLoading=false;
      this.toastr.success(this.translate.instant('dashboard.surveys.survey edited Successfully'));
        this.router.navigateByUrl('/dashboard/educational-settings/surveys');
  },(err)=>{  this.isBtnLoading=false;
    this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));})
  }



}

//add choices in details
addQuestionInCaseInputChoices(item,i)
{
console.log(item)

var choicesFormArr;
var questionsFormGrp
 this.questions.push(this.fb.group({
    surveyQuestionType: [item.surveyQuestionType, [Validators.required]],
    arabicQuestionText: [item.questionText.ar, [Validators.required,Validators.maxLength(1000)]],
    englishQuestionText: [item.questionText.en, [Validators.required,Validators.maxLength(1000)]],
    questionChoices: this.fb.array([]),
  }));

  item.questionChoices?.forEach((element) => {
 
     questionsFormGrp=this.questions.controls[i] as FormGroup
    choicesFormArr=questionsFormGrp.controls['questionChoices'] as FormArray;
    choicesFormArr.push(this.fb.group({
      arabicChoice: [element.questionChoice.ar, [Validators.required,Validators.maxLength(200)]],
      englishChoice: [element.questionChoice.en,[Validators.required,Validators.maxLength(200)]]}))
  
   
  });
  if(!item.questionChoices)
     { 
      questionsFormGrp=this.questions.controls[i] as FormGroup
     choicesFormArr=questionsFormGrp.controls['questionChoices'] as FormArray;
      choicesFormArr.push(this.fb.control(''))
    }

 console.log(questionsFormGrp)
  } 


//add attachment in details
addQuestionInCaseInputFile(item,i)
{
 this.list2=[];
  this.list=[]
 this.questions.push(this.fb.group({
    surveyQuestionType: [item.surveyQuestionType, [Validators.required]],
    arabicQuestionText: [item.questionText.ar, [Validators.required,Validators.maxLength(1000)]],
    englishQuestionText: [item.questionText.en, [Validators.required,Validators.maxLength(1000)]],
    attachment: [''],

  }));

  var questionsFormGrp=this.questions.controls[i] as FormGroup
  var attachmentFormCtr=questionsFormGrp.controls['attachment']
  console.log(item.attachment.url)
  if(item.attachment.url)
 {
  attachmentFormCtr.setValue(item.attachment)
  this.attachments[i]=item.attachment;
 
 }
 else
 {
  attachmentFormCtr.setValue(null)
  this.attachments[i]=null;
  
 }
 console.log(attachmentFormCtr.value)
if(item.surveyQuestionType==QuestionsTypeEnum.SurveyAttachmentQuestion)
 {
   attachmentFormCtr.setValidators([Validators.required]);
 }

}

addNewQuestion(){
 
  if(this.canAddSubjects){
    this.questions.push(this.fb.group({
      surveyQuestionType: ['', [Validators.required]],
       arabicQuestionText: ['', [Validators.required,Validators.maxLength(1000)]],
       englishQuestionText: ['', [Validators.required,Validators.maxLength(1000)]],
      attachment: ['', [Validators.required]],
      // questionChoices: this.fb.array([this.fb.control('', [Validators.required])]),
       questionChoices: this.fb.array([this.fb.group({
        arabicChoice: ['', [Validators.required,Validators.maxLength(200)]],
        englishChoice: ['',[Validators.required,Validators.maxLength(200)]]})]),
   
    }));
  }else{
    this.toastService.warning(
      this.getTranslateValue('pleaseFillTheAboveRate'),
      this.getTranslateValue('warning'),
      {timeOut: 3000}
    );
  }
console.log("yes")
}
  



 
 //exportPDf
  pdfToExport()  
 { 

   var data = document.getElementById('contentToConvert');
   html2canvas(data).then(canvas => {  
   
     let imgWidth = 208;    
     let imgHeight = canvas.height * imgWidth / canvas.width;  
   

     const contentDataURL = canvas.toDataURL('image/png')  
     let pdf = new jsPDF('p', 'mm', 'a4');   
     let position = 0;  
     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
     pdf.save(this.translate.instant('dashboard.surveys.Survey Report'));  
   });  
 }
  //exportExcel 
 ExportToExcel()
    {
    
      var data = document.getElementById('contentToConvert');
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(data)
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, 'SheetJS.xlsx');

    }
  
    onChangesurveyQuestionType(value,i)
    {
      console.log(value)
      var questionsFormGrp=this.questions.controls[i] as FormGroup
      var attachmentFormCtr=questionsFormGrp.controls['attachment']
      var choicesFormArr=questionsFormGrp.controls['questionChoices'] as FormArray;

      if(value==QuestionsTypeEnum.SurveyMultiChoiceQuestion)
      {
        attachmentFormCtr.clearValidators();
        attachmentFormCtr.updateValueAndValidity();
        for(let j in choicesFormArr.controls)
        {
          var choices=choicesFormArr.controls[j] as FormGroup
          choices.get('arabicChoice').setValidators([Validators.required]);
          choices.get('englishChoice').setValidators([Validators.required]);
        }
       
      }
      else if(value==QuestionsTypeEnum.SurveyAttachmentQuestion)
      {
        attachmentFormCtr.setValidators([Validators.required]);

        for(let j in choicesFormArr.controls)
        {
          var choices=choicesFormArr.controls[j] as FormGroup
          choices.get('arabicChoice').clearValidators();
          choices.get('arabicChoice').updateValueAndValidity();
          choices.get('englishChoice').clearValidators();
          choices.get('englishChoice').updateValueAndValidity();
          
        }
      }
      else  if(value==QuestionsTypeEnum.SurveyFreeTextQuestion||value==QuestionsTypeEnum.SurveyRateQuestion)
      {
        attachmentFormCtr.clearValidators();
        attachmentFormCtr.updateValueAndValidity();
        for(let j in choicesFormArr.controls)
        {
          var choices=choicesFormArr.controls[j] as FormGroup
          choices.get('arabicChoice').clearValidators();
          choices.get('arabicChoice').updateValueAndValidity();
          choices.get('englishChoice').clearValidators();
          choices.get('englishChoice').updateValueAndValidity();
        }
       
      }
     
    }
    changeStatus()
    {
      this.isSentBtnLoading=true;
    this.surveyService.updateCancelStatus(this.surveyId).subscribe((res)=>{
      this.isSentBtnLoading=false;
      if(res.statusCode!='BadRequest')
      {
     
        this.toastr.success(this.translate.instant('dashboard.surveys.Survey Status changed successfully'));
        this.getSurveyById();
      }
      else
      {
       
      this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));
      }
      
    },(err)=>{
      this.isSentBtnLoading=false;
      this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));
    })
    }

    checkStatusToSend()
    {
      if(this.surveyId)
      {
        this.step=2;
      }
      else
      {
        this.toastService.error(this.translate.instant('dashboard.surveys.You should save survey first to send it'))
      }
    }

    openMessage()
    {
      this.confirmModelService.confirmModelData$.next(this.translate.instant("dashboard.surveys.Are you sure that you need to cancel send the survey ?"));
      
      this.confirmModelService.openModel();
    }
    confirmDeleteListener(){
  
      this.subscription=this.confirmModelService.confirmed$.subscribe(val => {
        if (val) this.changeStatus();
        
      })
    } 
    ngOnDestroy(): void {
      
      this.subscription.unsubscribe();
      this.confirmModelService.confirmModelData$.next(null)
      this.confirmModelService.confirmed$.next(null);
    }
}


