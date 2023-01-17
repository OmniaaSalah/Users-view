import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class SurveyDetailsComponent implements OnInit {
  questionType;
  showText:boolean=false;
  showFile:boolean=false;
  get StatusEnum() { return StatusEnum }
  selectedSurveyType : any;
  selectedSurveyQuestionType :any;
  surveyType;
  surveyQuestionType = [
    { name: 'اختياري من متعدد', code: 1 },
    { name: 'ملف', code: 2 },
    { name: 'نجوم', code: 3 },
    { name: 'نص حر ', code: 0 }
  ];
  editSurvey: IEditSurvey = <IEditSurvey>{};
  subjects: ISurveyQuestion[]
  faCheck = faCheck
  assesmentFormGrp: FormGroup;
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

  //popup modals

  targetsModalOpend = false
  responsesModalOpend = false


  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات',routerLink:'/dashboard/educational-settings/surveys' ,routerLinkActiveOptions:{exact: true}},
      { label: 'تفاصيل الاستبيان' ,routerLink:'/dashboard/educational-settings/surveys/survey-details' ,routerLinkActiveOptions:{exact: true} },
    ],
    mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
  }
  _fileName :string[] = [];
  fileName = 'file.pdf'


  // breadCrumb
  items: MenuItem[] = [
    { label: 'قائمه الاستبيانات ' },
    { label: 'إنشاء استبيان جديد' },

  ];
  get classSubjects(){ return this.assesmentFormGrp.controls['subjects'] as FormArray }
  private getTranslateValue(key: string): string {
    return this.translate.instant(key);
  }
  get canAddSubjects(): boolean {
    return this.assesmentFormGrp.get('subjects').valid;
  }
  get questionChoices():FormArray {
    return this.assesmentFormGrp.controls['questionChoices'] as FormArray;
  }
  constructor(
    private translate: TranslateService,
    private headerService: HeaderService, private fb:FormBuilder,    private layoutService: LayoutService,
    private assessmentService: AssessmentService,
    private surveyService: SurveyService,
    private _router: ActivatedRoute,
    public translationService: TranslationService,
    private toastr: ToastrService,
    private router: Router,
    private toastService: ToastService) {const formOptions: AbstractControlOptions = {};
    this.assesmentFormGrp = fb.group({
      surveyType: ['', [Validators.required]],
      surveyTitle: ['', [Validators.required]],
      subjects: this.fb.array([])

    }, formOptions);

  }
  ngOnInit(): void {
    this.questionType=this.surveyService.questionType;
    this.surveyType=this.surveyService.surveyType;
    this.getSurveyById();
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark');
    this.headerService.Header.next(
      {
        breadCrump: [
          { label: 'قائمه الاستبيانات' ,routerLink:'/dashboard/educational-settings/surveys',routerLinkActiveOptions:{exact: true}},
          { label: 'تفاصيل الاستبيان',routerLink:'/dashboard/educational-settings/surveys/survey-details',routerLinkActiveOptions:{exact: true} }],
          mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurvey') }
      }
    );
  }


  fillSubjects(){
    this.subjects.forEach(subject => {
      this.classSubjects.push(this.fb.group({
        surveyQuestionType: [subject.surveyQuestionType],
        questionText: [subject.questionText],
        attachment: [subject.attachment],
        questionChoices: [subject.questionChoices]
      }))
    })
  }

  newSubjectGroup(){
    return this.fb.group({
      surveyQuestionType: ['', [Validators.required]],
      questionText: ['', [Validators.required]],
      attachment: [''],
      questionChoices: this.fb.array([])
    })
  }
  addSubject(){
    if(this.canAddSubjects){
      this.classSubjects.push(this.newSubjectGroup());
    }else{
      this.toastService.warning(
        this.getTranslateValue('pleaseFillTheAboveRate'),
        this.getTranslateValue('warning'),
        {timeOut: 3000}
      );
    }
    //this.classSubjects.push(this.newSubjectGroup())
  }

  addChoices()
  {
    this.questionChoices.push(['', [Validators.required]]);
   
  }


uploadFile(e,i) {
  this._fileName[i] = e.target.files[0].name;
  //this._fileName.push(e.target.files[0].name)
}

getSurveyById()
{
  this.surveyService.getSurveyById(Number(this._router.snapshot.paramMap.get('surveyId'))).subscribe(response=>{
    this.editSurvey = response ;
    this.selectedSurveyType = this.editSurvey.surveyType;
    this.selectedSurveyType == 'Optional' ?
    this.selectedSurveyType = this.surveyType[1] :
    this.selectedSurveyType = this.surveyType[0];

    this.editSurvey.surveyQuestions.forEach((item)=>{
      this.addDataIntoSubject(item)
     })

    this.assesmentFormGrp.patchValue({
      surveyType: this.selectedSurveyType,
      surveyTitle: this.editSurvey.surveyTitle.ar
    })
  })
}
onFileUpload(event)
{

}
onChangesurveyQuestionType(event: any , i:any) {
  console.log(event)
  this.showFile=false;
  this.showText=false;

  //  if(event==QuestionsTypeEnum.SurveyMultiChoiceQuestion||event==QuestionsTypeEnum.SurveyRateQuestion)
  // {

  //   this.showText=true;
  // }
  // else if(event==QuestionsTypeEnum.SurveyAttachmentQuestion||event==QuestionsTypeEnum.SurveyFreeTextQuestion)
  // {

  //   this.showFile=true;
  // }

  const QuestionChoicesDiv = document.getElementById( `div_questionChoices_${i}`) as HTMLInputElement | null;
  const attachmentDiv = document.getElementById( `div_attachment_${i}`) as HTMLInputElement | null;
  let typeOfQuestion = event.value.value;
  switch (typeOfQuestion) {
    case QuestionsTypeEnum.SurveyMultiChoiceQuestion: {
      QuestionChoicesDiv.style.display = 'block';
      attachmentDiv.style.display = 'none';
      break;
    }
    case QuestionsTypeEnum.SurveyAttachmentQuestion: {
      QuestionChoicesDiv.style.display = 'none';
      attachmentDiv.style.display = 'block';
      break;
    }
    case QuestionsTypeEnum.SurveyRateQuestion: {
      QuestionChoicesDiv.style.display = 'block';
      attachmentDiv.style.display = 'none';
      break;
    }
    case QuestionsTypeEnum.SurveyFreeTextQuestion: {
      QuestionChoicesDiv.style.display = 'none';
      attachmentDiv.style.display = 'block';
      break;
    }
    default: {
      break;
    }
  }
}





////////////////////////////////////////////////////////
list_names =[]
list_name0 =[]
list_name1 =[]
list_name2 =[]
list_name3 =[]
AllList = [[],[],[],[]];
counter : number =0;
addDataIntoSubject(item){

  this.selectedSurveyQuestionType = item.surveyQuestionType;
  switch (this.selectedSurveyQuestionType) {
    case 'SurveyMultiChoiceQuestion': {
      this.selectedSurveyQuestionType = this.surveyQuestionType[0];
      break;
    }
    case 'SurveyAttachmentQuestion': {
      this.selectedSurveyQuestionType = this.surveyQuestionType[1];
      break;
    }
    case 'SurveyRateQuestion': {
      this.selectedSurveyQuestionType = this.surveyQuestionType[2];
      break;
    }
    case 'SurveyFreeTextQuestion': {
      this.selectedSurveyQuestionType = this.surveyQuestionType[3];
      break;
    }
    default: {
      break;
    }
  }


  if(item.questionChoices){

    item.questionChoices.forEach((element)=>{
     
      console.log( this.list_names);
      console.log( this.AllList);

      this.list_names.push(element);
      this.AllList[this.counter].push(element);

      console.log( this.list_names);
      console.log( this.AllList);
    })
  }
  if(item.attachment != null && item.attachment != ""){
    this._fileName[this.counter] = item.attachment;
  }
    this.classSubjects.push(this.fb.group({
      surveyQuestionType: [this.selectedSurveyQuestionType],
      questionText: [item.questionText],
      attachment: [item.attachment],
      questionChoices: [item.questionChoices]
    }))
    this.counter++;
}
editNewSurvey: IEditNewSurvey = <IEditNewSurvey>{};
addsurveyQuestion: ISurveyQuestionEdit = <ISurveyQuestionEdit>{};
goToEditSurvey() {
  this.editNewSurvey.surveyQuestions = [];
  this.editNewSurvey.title = { ar: '', en: '' };
  this.editNewSurvey.title.ar = this.assesmentFormGrp.value.surveyTitle;
  this.editNewSurvey.title.en = this.assesmentFormGrp.value.surveyTitle;
  this.editNewSurvey.surveytype = this.assesmentFormGrp.value.surveyType.code;


  this.assesmentFormGrp.value.subjects.forEach((element , index) => {
    this.addsurveyQuestion.questionChoices = [];
    this.addsurveyQuestion.attachment = element.attachment;
    this.addsurveyQuestion.optionalAttachment = element.attachment;
    this.addsurveyQuestion.questionText = element.questionText.toString();
    this.addsurveyQuestion.surveyQuestionType =Number(element.surveyQuestionType.code);
    this.addsurveyQuestion.questionChoices.push(element.questionChoices);
    debugger
    console.log(this.AllList[index]);
    if(this.AllList[index] != undefined && this.AllList[index].length > 0){
      debugger
      console.log(this.AllList[index]);
      let objList : string[]=[];
      this.AllList[index].forEach((list=>{
        objList.push(list)
        //this.addsurveyQuestion.questionChoices.push(list);
      }))
      this.addsurveyQuestion.questionChoices = objList;
    }

    let clone = {...this.addsurveyQuestion};
    this.editNewSurvey.surveyQuestions.push(clone);

  })


  console.log("--- object to EDIT ---");
  console.log(this.editNewSurvey);

  this.surveyService.Editsurvey(Number(this._router.snapshot.paramMap.get('surveyId')),this.editNewSurvey).subscribe(res => {
    console.log(res);
    this.toastr.success('Edit Successfully', '');
    this.router.navigateByUrl('/dashboard/educational-settings/surveys');
  });

}
}
