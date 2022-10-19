import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user/user.service';

import { AssessmentService } from 'src/app/modules/dashboard/modules/assessment/service/assessment.service';
import { Iassignments } from 'src/app/modules/dashboard/modules/assignments/assignments/model/Iassignments';
import { IuploadAssignment } from 'src/app/modules/dashboard/modules/assignments/assignments/model/IuploadAssignment';
import { IAccountAddOrEdit } from 'src/app/modules/dashboard/modules/user-information/models/IAccountAddOrEdit';

@Component({
  selector: 'app-send-btn',
  templateUrl: './send-btn.component.html',
  styleUrls: ['./send-btn.component.scss']
})
export class SendBtnComponent implements OnInit {
  @Input('route') routeUrl='';
  @Input('typeOfAdd') typeOfAdd='';
  @Input('content') content:FormGroup;
  @Input('backGroundColor') backGroundColor='';
  plusIcon = faPlus;
  checkIcon = faCheck;

  accountModel : IAccountAddOrEdit= <IAccountAddOrEdit>{};
  assignmentModel : IuploadAssignment= <IuploadAssignment>{};

  currentDate = new Date();


  constructor(private _router: ActivatedRoute,private router: Router,private route:ActivatedRoute , private userService : UserService,
    private assignmentService : AssessmentService) { }

  ngOnInit(): void {

  }
  goToAddNew()
  {
    let typeOfAdd = this.typeOfAdd.toString();
    switch(typeOfAdd) {
      case 'AddOrEditUser': {
        this.AddOrEditAccount();
         break;
      }
      case 'uploadAssignment': {
        this.UploadAssignment();
         break;
      }
      default: {

         break;
      }

   }
   this.router.navigate([this.routeUrl],{relativeTo:this.route});
  }
  AddOrEditAccount(){
    let id = this._router.snapshot.paramMap.get('userId');
    if(id == null){
      debugger
      //this.accountModel.id =Number(id);
      this.accountModel.fullName = this.content.value.fullName;
      this.accountModel.phoneNumber = this.content.value.phoneNumber;
      this.accountModel.email = this.content.value.email;
      this.accountModel.emiratesIdNumber = "7894562";
      this.accountModel.arabicSurname = "";
      this.accountModel.englishSurname =this.content.value.fullName;
      this.accountModel.jobTitle = "test";
      this.accountModel.gender = 0;
      this.accountModel.birthDate = "",
      this.accountModel.emiratesIdPath = "";
      this.accountModel.employeeIdNumber = "";
      this.accountModel.permissionToEnterScore = true;
      this.accountModel.relativeRelationId= 0;
      this.accountModel.scope= "SPEA";
      this.accountModel.isActive= true;
      this.accountModel.nickName = this.content.value.nickName;
      this.accountModel.nationalityId =this.content.value.identityNumber;
      this.accountModel.password = this.content.value.password;
      this.accountModel.status = 1;
      this.accountModel.roles =[2];
      console.log( this.accountModel);
      this.userService.AddAccount(this.accountModel).subscribe(res => {
      console.log(res);
     });
    }
    else{
      debugger
       this.accountModel.id =Number(id);
       this.accountModel.fullName = this.content.value.fullName;
       this.accountModel.phoneNumber = this.content.value.phoneNumber;
       this.accountModel.email = this.content.value.email;
       this.accountModel.emiratesIdNumber = "7894562";
       this.accountModel.arabicSurname = "";
       this.accountModel.englishSurname = "";
       this.accountModel.jobTitle = null;
       this.accountModel.gender = null;
       this.accountModel.birthDate = "",
       this.accountModel.emiratesIdPath = "";
       this.accountModel.employeeIdNumber = "";
       this.accountModel.permissionToEnterScore = true;
       this.accountModel.relativeRelationId= null;
       this.accountModel.scope= "SPEA";
       this.accountModel.isActive= false;
       this.accountModel.nickName = this.content.value.nickName;
       this.accountModel.nationalityId =this.content.value.identityNumber;
       this.accountModel.password = this.content.value.password;
       this.accountModel.status = 1;
       this.accountModel.roles = [2];
       this.userService.EditAccount(this.accountModel).subscribe(res => {
       console.log(res);
      });
    }
  }

  UploadAssignment(){
    this.assignmentModel.arabicName = this.content.value.ExamName ;
    this.assignmentModel.englishName= this.content.value.ExamName ;
    let _examDuration = `00:${this.content.value.ExamDuration}:00 `;
    this.assignmentModel.examduration = _examDuration;
    this.assignmentModel.examShowTime = "00:08:00";
    const date = new Date(this.content.value.ExamDate);
    this.assignmentModel.examShowDate= date.toISOString().slice(0,10);
    this.assignmentModel.gradeId = this.content.value.grades.id;
   // this.assignmentModel.subjectId= this.content.value.subjects.id;
    this.assignmentModel.subjectId= 4;
    this.assignmentModel.curriculumId= this.content.value.curriculum.id;

    if (this.assignmentModel.examShowDate.slice(0, 10) === formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')) {
      this.assignmentModel.examStatus=1;
    } else {
      this.assignmentModel.examStatus=2;
    }





    this.assignmentService.AddAssignment(this.assignmentModel).subscribe(res => {
      console.log(res);
     });
  }
  goToCancle(){
    this.router.navigate([this.routeUrl],{relativeTo:this.route});
  }
}
