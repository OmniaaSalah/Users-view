import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-parent-reply-survey',
  templateUrl: './parent-reply-survey.component.html',
  styleUrls: ['./parent-reply-survey.component.scss']
})
export class ParentReplySurveyComponent implements OnInit {
  selected: any = null;

  survey={
    "surveyQuestions": [
      {
      "surveyQuestionType": "SurveyMultiChoiceQuestion",
      "questionText": "ملف",
      "optionalAttachment": null,
      "attachment": null,
      "questionId": 10,
      "questionChoices": [
        {id:7,title:"ahmed"},
        {id:8,title:"khaled"},
        {id:9,title:"ali"}
      ]
    },
    {
      "surveyQuestionType": "SurveyFreeTextQuestion",
      "questionText": "textTitle",
      "optionalAttachment": null,
      "attachment": null,
      "questionId": 11,
      "questionChoices": [],
    },  
   {
      "surveyQuestionType": "SurveyAttachmentQuestion",
      "questionText": "textTitle",
      "optionalAttachment": null,
      "attachment": null,
      "questionId": 12,
      "questionChoices": [],
    },
 	  {
      "surveyQuestionType": "SurveyRateQuestion",
      "questionText": "textTitle",
      "optionalAttachment": null,
      "attachment": null,
      "questionId": 13,
      "questionChoices": [],
    },
  ],
  "surveyNumber": 1483626647,
  "surveyType": "Optional",
  "disApperanceDate": "0001-01-01T00:00:00",
  "surveyQuestionCount": 1,
  "surveyTitle": {
    "en": "اخر استبيان بجد ",
    "ar": "اخر استبيان بجد "
  },
}

surveyForm:FormGroup

  constructor( private fb:FormBuilder,private _survey:SurveyService,   private toastr:ToastrService,) { }

  ngOnInit(): void {
    this.selected = this.survey.surveyQuestions[0];
    this.surveyForm = this.fb.group({
      // choiceId:null,
      // answer:"",
      // rate:null
      surveyQuestions: this.fb.array([])
    })

    this.survey.surveyQuestions.forEach((value,index)=>{
      this.addquestion()
      this.surveyQuestions.at(index).patchValue({
        questionId: value.questionId,
        type: value.surveyQuestionType,
        choices:value?.questionChoices || [],
        title: value?.questionText || "",
        attachment: value?.attachment
      });
    })
    console.log(this.surveyForm.value);
  }

  get surveyQuestions(): FormArray {
    return this.surveyForm.get('surveyQuestions') as FormArray;
  }
 
  newQuestion(): FormGroup {
    return this.fb.group({
      questionId:[null,Validators.required],
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
      answer: files[0].url
    });
   }
    
  messageDeleted1(event,index){
    this.surveyQuestions.at(index).patchValue({
      answer: null
    });
 }



 sendData(){
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
    "surveyId": this.survey.surveyNumber,
    "guardianId": JSON.parse(localStorage.getItem('$AJ$userId')),
    "surveyResponseModel": surveyResponseModel
  }
    
  this._survey.sendParentSurvey(data).subscribe(res=>{
    this.toastr.success('تم الارسال بنجاح')
    this.surveyForm.reset()
    this.survey.surveyQuestions.forEach((value,index)=>{
      this.surveyQuestions.at(index).patchValue({
        questionId: value.questionId,
        type: value.surveyQuestionType,
        choices:value?.questionChoices || [],
        title: value?.questionText || "",
        attachment: value?.attachment
      });
    })
    
  })
 }
}
