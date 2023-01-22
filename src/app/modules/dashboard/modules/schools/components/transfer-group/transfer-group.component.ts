import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { Component, OnInit, Input, ViewChild, ElementRef, inject } from '@angular/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolsService } from '../../services/schools/schools.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradesService } from '../../services/grade/grade.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { StudentsService } from '../../../students/services/students/students.service';
import { DivisionService } from '../../services/division/division.service';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Component({
  selector: 'app-transfer-group',
  templateUrl: './transfer-group.component.html',
  styleUrls: ['./transfer-group.component.scss']
})
export class TransferGroupComponent implements OnInit {
  @ViewChild('checkBox') checkBox: ElementRef;

  lang= inject(TranslationService).lang
  currentUserScope = inject(UserService).getCurrentUserScope()
  schoolId=this.route.snapshot.paramMap.get('schoolId')

  spinner:boolean = false
  skeletonShown = false
  students = []
  schools = []
  grades$ = this.sharedService.getAllGrades('')
  divisonsList=[]
  isChecked = false
  choosenStudents = []
  requestForm:FormGroup
  searchModel= {
    keyWord:null,
    GradeId:null,
    DivisionId:null
   }
   allChecked = false
   checkboxSelected = false
  selectedSchool={ index: null, value: null} 

  searchText=''
  selectedStudents=[];
  
  componentHeaderData: IHeader={
		breadCrump: [],
	}

  constructor(private headerService:HeaderService,
    private _schools:SchoolsService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private _grade:GradesService,
    private _student:StudentsService,
    private _division:DivisionService,
    private sharedService:SharedService,
    private translate:TranslateService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkDashboardHeader();
  

    this.requestForm = this.fb.group({
      grade:['',Validators.required],
      division:[null]
    })
  }

  getAllStudents(){
    this._student.getAllStudents({GradeId: this.searchModel.GradeId,SchoolId:this.schoolId,Keyword:this.searchModel.keyWord,DivisionId:this.searchModel.DivisionId}).subscribe(res=>{
      this.students = res.data.map(er=>er.checkboxSelected)  
      
      this.students=res.data.map((student)=>{return {
        'id':student.id,
        'name':{'ar':student.name.ar,'en':student.name.en },
        'isSelected':false,
        }});
    })
  }


  checkGradeValue(event){
    this.divisonsList = []
    this.allChecked = false;
    this.checkboxSelected = false
    this.choosenStudents = []
    // this.selectedSchool.value= null
    this.searchModel.DivisionId = null
    this.requestForm.get('grade').setValue(event)    
    this.searchModel.GradeId = this.requestForm.value.grade
    this.getAllSchools()
    this.getAllStudents()
    this.getAllDivisions()
  }

  checkDivisionValue(event){
    this.allChecked = false;
    this.checkboxSelected = false
    // this.selectedSchool.value= null
    this.choosenStudents = []
    this.requestForm.get('division').setValue(event)    
    this.searchModel.DivisionId = this.requestForm.value.division
    this.getAllStudents()
  }

  getAllSchools(){
    this.skeletonShown = true
    this._schools.getAllSchools(this.searchModel).subscribe(res=>{
      this.schools = res.data      
      this.skeletonShown = false
    })
  }

  getAllDivisions(){
    this._grade.getGradeDivision(this.schoolId,this.searchModel.GradeId).subscribe(res=>{
      this.divisonsList = res?.data
    })
  }

  getSearchedStudents(textValue){    
    this.searchModel.keyWord = textValue.target.value
    this.getAllStudents()
  }


  onSelectSchool(index, school) {    
    this.selectedSchool.index= index
    this.selectedSchool.value =school
  }

  chooseStudent(event,studentId){      
    if (event.checked) {
      this.choosenStudents.push(studentId)
    } else {
      this.choosenStudents.forEach((item, index) => {
        if (studentId === item) {          
          this.choosenStudents.splice(index, 1)
        }
      });
    }    

    if(this.choosenStudents.length ==  this.students.length){ 
      this.allChecked = true      
      
    }else{
      this.allChecked = false
      
    }
    // console.log(this.choosenStudents);
  }


  checkAll(event){
    if (this.allChecked) {      
      this.students.forEach(res=>{
        res.isSelected = true
      })
       this.choosenStudents = this.students.map(er=>{
        return er.id
        })
    } else {
      this.students.forEach(res=>{
        res.isSelected = false
      })
      this.choosenStudents  = []
    }    
    // console.log(this.choosenStudents);
  }

  sendRequestData(){
    this.spinner = true
    if(this.requestForm.value.division != null && this.requestForm.value.grade !=null){
      let data = {
        "studentIds": this.choosenStudents,
        "gradeId": this.requestForm.value.grade,
        "divisionId":  this.requestForm.value.division,
        "transfferdSchoolId": this.selectedSchool.value.id,
        "currentSchoolId": Number(this.schoolId),
        "transferType":0
      }

      this._schools.postTransferGroup(data).subscribe(res=>{
        this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'));
        this.spinner = false
        this.choosenStudents = []
        this.requestForm.reset()
        // this.selectedSchool = null
      },err=>{
        this.toastr.error(err);
        this.spinner = true
      })
    } 

    if( this.requestForm.value.grade && this.requestForm.value.division == null){
      let data = {
        "studentIds": this.choosenStudents,
        "gradeId": this.requestForm.value.grade,
        "divisionId":  this.requestForm.value.division,
        "transfferdSchoolId": this.selectedSchool.value.id,
        "currentSchoolId": Number(this.schoolId),
        "transferType":1
      }

      this._schools.postTransferGroup(data).subscribe(res=>{
        this.spinner = false
        this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'));
        this.choosenStudents = []
        this.requestForm.reset()
        // this.selectedSchool = null
      },err=>{
        this.spinner = false
        this.toastr.error(this.translate.instant('toasterMessage.error'));
  
      })
    }

   this.students = []
   this.schools = []
   this.selectedSchool.value = null
  //  this.selectedSchool.index = null
   this.searchModel.keyWord=null,
   this.searchModel.GradeId=null,
   this.searchModel.DivisionId=null
  }



  checkDashboardHeader()
  {
      if(this.currentUserScope==UserScope.Employee)
    {
      this.componentHeaderData.breadCrump=
      [
        {label:this.translate.instant('dashboard.schools.studentsList') ,routerLink:'/dashboard/student-management/students'},
        { label: this.translate.instant('dashboard.students.TransferStudentGroup'), routerLink: `/dashboard/school-management/school/${this.schoolId}/transfer-students`},
      ]

      
    }
    else if (this.currentUserScope==UserScope.SPEA)
    {
      this.componentHeaderData.breadCrump=
         [
          { label: this.translate.instant('breadcrumb.schoolList') , routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
          { label: this.translate.instant('dashboard.students.TransferStudentGroup'), routerLink: `/dashboard/schools-and-students/schools/transfer-students`},
        ]

      
    }

    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

 
}
