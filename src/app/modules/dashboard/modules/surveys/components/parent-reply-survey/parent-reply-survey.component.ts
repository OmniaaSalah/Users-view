import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-parent-reply-survey',
  templateUrl: './parent-reply-survey.component.html',
  styleUrls: ['./parent-reply-survey.component.scss']
})
export class ParentReplySurveyComponent implements OnInit {
  selected: any = null;
  surveyId;
  survey

// surveyForm:FormGroup
isDisabled:boolean = false

surveyForm = this.fb.group({
  // choiceId:null,
  // answer:"",
  // rate:null
  surveyQuestions: this.fb.array([])
})

  constructor( private fb:FormBuilder,private _survey:SurveyService,   private toastr:ToastrService,private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.surveyId = this.route.snapshot.paramMap.get('surveyId');
    this._survey.getSurveyById(this.surveyId).subscribe(res=>{
      this.survey = res
      // console.log(this.survey);
      this.selected = this.survey.surveyQuestions[0];
      this.patchSuveies(res.surveyQuestions)
      console.log(this.surveyForm.value);
       this.checkChangesForm()
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
        console.log("true");

      }
    })
    // console.log(this.surveyForm.value);
    
    // console.log(res.surveyQuestions.every(this.isSameAnswer));
    
        // if(res.surveyQuestions.every(this.isSameAnswer) == true){
        //   this.isDisabled = true
        // }
        // else{
        //   this.isDisabled = false
        // }
  })
}

patchSuveies(surveyarray){
  surveyarray.forEach((value,index)=>{
    this.addquestion()
    this.surveyQuestions.at(index).patchValue({
      questionId: value.questionId,
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
    "surveyId": Number(this.surveyId),
    "guardianId": JSON.parse(localStorage.getItem('$AJ$userId')),
    "surveyResponseModel": surveyResponseModel
  }
    console.log(data);
    
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
