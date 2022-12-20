import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolsService } from '../../services/schools/schools.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradesService } from '../../services/grade/grade.service';

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

  searchText=''
  selectedStudents=[]
  componentHeaderData: IHeader = {
		breadCrump: [
			{ label: 'قائمه المدارس ' , routerLink: '/dashboard/schools-and-students/schools',routerLinkActiveOptions:{exact: true}},
			{ label: 'ارسال طلب نقل جماعي', routerLink: `/dashboard/schools-and-students/schools/transfer-students`},
		],
	}
  constructor(private headerService:HeaderService,
    private _schools:SchoolsService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private _grade:GradesService) { }

  ngOnInit(): void {
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
  
}
