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

@Component({
  selector: 'app-transfer-group',
  templateUrl: './transfer-group.component.html',
  styleUrls: ['./transfer-group.component.scss']
})
export class TransferGroupComponent implements OnInit {
  @ViewChild('checkBox') checkBox: ElementRef;
  language=localStorage.getItem('preferredLanguage')
  schoolId=this.route.snapshot.paramMap.get('schoolId')
  students = []
  schools = []
  grades = []
  divisonsList=[]
  isChecked = false
  choosenStudents = []
  requestForm:FormGroup
  searchModel= {
    keyWord:'',
    GradeId:'' 
   }
  selectedSchool={ index: null, value: null} 

  currentUserScope = inject(UserService).getCurrentUserScope()
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
    private translate:TranslateService) { }

  ngOnInit(): void {
    this.checkDashboardHeader();
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.getAllGrades()
    this.requestForm = this.fb.group({
      grade:['',Validators.required],
      division:[null]
    })
  }

  getAllStudents(){
    this._schools.getAllStudentsSchool({GradeId: this.searchModel.GradeId,SchoolId:this.schoolId}).subscribe(res=>{
      this.students = res.data      
    })
  }

  getAllGrades(){
    this._schools.getAllGrades().subscribe(res=>{
      this.grades = res.data
    })
  }

  checkGradeValue(event){
    this.selectedSchool.value= null
    this.requestForm.get('grade').setValue(event)    
    this.searchModel.GradeId = this.requestForm.value.grade
    this.getAllSchools()
    this.getAllStudents()

  }

  getAllSchools(){
    this._schools.getAvailableSchools(this.searchModel).subscribe(res=>{
      this.schools = res.data      
    })
  }

  getAllDivisions(){
    this._grade.getGradeDivision(this.selectedSchool.value.id,this.searchModel.GradeId).subscribe(res=>{
      this.divisonsList = res.data
    })
  }

  getSearchedStudents(textValue){    
    this.searchModel.keyWord = textValue.target.value
    this.getAllStudents()
  }

  getSearchedSchools(value){
    this.searchModel.keyWord = value.target.value
    this.getAllSchools()
  }

  onSelectSchool(index, school) {
    this.selectedSchool.index= index
    this.selectedSchool.value =school
    this.getAllDivisions()
  }

  chooseStudent(event,student){    
    if (event.target.checked) {
      this.choosenStudents.push(student.id)
    } else {
      this.choosenStudents.forEach((item, index) => {
        if (student.id === item) {          
          this.choosenStudents.splice(index, 1)
        }
      });
    }    

    if(this.choosenStudents.length ==  this.students.length){ 
      this.checkBox.nativeElement.checked = true      
      
    }else{
      this.checkBox.nativeElement.checked = false
      
    }
    // console.log(this.choosenStudents);
  }


  checkAll(event){
    if (event.target.checked) {
      this.isChecked = true
       this.choosenStudents = this.students.map(er=>{
        return er.id
        })
    } else {
      this.isChecked = false
      this.choosenStudents  = []
    }    
    // console.log(this.choosenStudents);
  }

  sendRequestData(){
    let data = {
      "studentsId": this.choosenStudents,
      "grade": this.requestForm.value.grade,
      "division":  this.requestForm.value.division,
      "selectedSchool": this.selectedSchool.value.id
    }
    console.log(data);
    
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
  }
  get userScope() 
  { 
    return UserScope 
  }
  
 
}
