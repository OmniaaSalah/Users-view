import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user/user.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-parent-reply-survey',
  templateUrl: './parent-reply-survey.component.html',
  styleUrls: ['./parent-reply-survey.component.scss']
})
export class ParentReplySurveyComponent implements OnInit {
  isBtnLoading: boolean=false;
  notAvailable:boolean=false;
  errorMessage;
  selected: any = null;
  surveyId;
  survey;
  currentGuardianId;
  get StatusEnum() { return StatusEnum }
// surveyForm:FormGroup
isDisabled:boolean = false
currentUserScope=this.userService.getCurrentUserScope();
surveyForm = this.fb.group({
 
  surveyQuestions: this.fb.array([])
})

  constructor( private router: Router,private userService:UserService, private fb:FormBuilder,private _survey:SurveyService,private translate:TranslateService,   private toastr:ToastrService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentGuardianId= JSON.parse(localStorage.getItem('$AJ$currentGuardian'))?.id;
     this.surveyId = this.route.snapshot.paramMap.get('surveyId');


     if(this.currentUserScope == UserScope.Guardian) 
     {
      this.openSurvey();
     }
     else
     {
      this.notAvailable=true;
      this.errorMessage={en:'this survey not allowed to you',ar:this.translate.instant('this survey not allowed to you')}
     }

}
openSurvey()
{
  this._survey.markSurveyAsOpened(this.surveyId,this.currentGuardianId).subscribe((res)=>{
    if(res.statusCode=="BadRequest")
    {
       this.notAvailable=true;
       this.errorMessage=res.errorLocalized;
   
    } 
    else
    {
      this.notAvailable=false;
      this.getSurveyById();
    }
  },(err)=>{
      this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));
    })
}


getSurveyById()
{
  this._survey.getSurveytoResponse(this.surveyId,this.currentGuardianId).subscribe(res=>{
    if(res.result.statusCode=="BadRequest")
     {
        this.notAvailable=true;
        this.errorMessage=res.result.errorLocalized;
     } 
     else
     { this.survey = res.result.result
      this.selected = this.survey.surveyQuestions[0];
      this.patchSuveies(res.result.result.surveyQuestions)
      console.log(this.surveyForm.value);
      this.checkChangesForm()
     }
  })
}
checkChangesForm(){
  this.surveyForm.valueChanges.subscribe((res)=>{  
    console.log(this.surveyForm.value);
      
    res.surveyQuestions.every(element=>{
      if(element['answer'] == null || element['answer'] == ''){
      return this.isDisabled= false
        console.log("false");
        

      }else{
        return this.isDisabled= true
       

      }
    })
   
  })
}

patchSuveies(surveyarray){
  surveyarray.forEach((value,index)=>{
    this.addquestion()
    this.surveyQuestions.at(index).patchValue({
      surveyQuestionId: value.questionId,
      type: value.surveyQuestionType,
      choices:value?.questionChoices || [],
      title: value?.questionText || "",
      attachment: value?.attachment
    });
  })
}

isSameAnswer(el, index, arr) {
  if (index === 0) {
    return true;
  } else {
    return (el.answer !== null) && (el.answer !== '');
  }
}

  get surveyQuestions(): FormArray {
    return this.surveyForm.get('surveyQuestions') as FormArray;
  }
 
  newQuestion(): FormGroup {
    return this.fb.group({
      surveyQuestionId:[null,Validators.required],
      answer:[null,Validators.required],
      type:[null,Validators.required],
      choices:[[]],
      title:[null],
      attachment:[null]
    });
  }

  addquestion() {
    this.surveyQuestions.push(this.newQuestion());
  }

  messageUpload1(files,index){
    this.surveyQuestions.at(index).patchValue({
      answer: files[0]
    });
   }
    
  messageDeleted1(event,index){
    this.surveyQuestions.at(index).patchValue({
      answer: null
    });
 }



 sendData(){
  this.isBtnLoading=true;
  let surveyResponseModel = []
 const newArr = JSON.parse(JSON.stringify(this.surveyForm.value.surveyQuestions))
  
  newArr.map((element)=>{    
    if(element.type=="SurveyMultiChoiceQuestion"){
      delete Object.assign(element, {['choiceId']: element['answer'] })['answer'];
    }
    if(element.type=="SurveyFreeTextQuestion"){
      // delete Object.assign(element, {['answer']: element['answer'] })['answer'];
    }
    if(element.type=="SurveyAttachmentQuestion"){
      delete Object.assign(element, {['attachment']: element['answer'] })['answer'];
    }
    if(element.type=="SurveyRateQuestion"){
      delete Object.assign(element, {['rate']: element['answer'] })['answer'];
    }
  })
  surveyResponseModel = [...newArr]
  newArr.forEach(object => {
    delete object['choices'];
    delete object['title'];
    delete object['type'];
  });
   
  let data = {
    "surveyId": Number(this.surveyId),
    "guardianId": this.currentGuardianId,
    "surveyResponseModel": surveyResponseModel
  }
    console.log(data);
    
  this._survey.sendParentSurvey(data).subscribe(res=>{
    this.isBtnLoading=false;
    this.toastr.success(this.translate.instant('dashboard.replySurvey.Survey is suibmitted successfully'))
    this.router.navigateByUrl('/'); 
  },(err)=>{ this.isBtnLoading=false;
    this.toastr.error(this.translate.instant("Request cannot be processed, Please contact support."));
  })
 }
}
