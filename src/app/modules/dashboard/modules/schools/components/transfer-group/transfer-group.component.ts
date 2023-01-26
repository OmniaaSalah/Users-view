import { paginationState } from 'src/app/core/models/pagination/pagination.model';
import { Component, OnInit, Input, ViewChild, ElementRef, inject } from '@angular/core';
import { IHeader } from 'src/app/core/Models/header-dashboard';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { SchoolsService } from '../../services/schools/schools.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GradesService } from '../../services/grade/grade.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { UserScope } from 'src/app/shared/enums/user/user.enum';
import { StudentsService } from '../../../students/services/students/students.service';
import { DivisionService } from '../../services/division/division.service';
import { ToastrService } from 'ngx-toastr';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { SettingsService } from '../../../system-setting/services/settings/settings.service';
import { Filtration } from 'src/app/core/classes/filtration';
import { Filter } from 'src/app/core/models/filter/filter';
import { map } from 'rxjs';

@Component({
  selector: 'app-transfer-group',
  templateUrl: './transfer-group.component.html',
  styleUrls: ['./transfer-group.component.scss']
})
export class TransferGroupComponent implements OnInit {
  @ViewChild('checkBox') checkBox: ElementRef;

  lang= inject(TranslationService).lang
  currentUserScope = inject(UserService).getCurrentUserScope()
  schoolId= this.userService.getCurrentSchoollId()

  filteration:Filter ={...Filtration, curriculumId:1,GradeId:''}
  studentFilteration:Filter = {...Filtration,SchoolId:this.schoolId, GradeId:'',DivisionId:'',PageSize:null}

  schools={
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }

  spinner:boolean = false
  students = {
    totalAllData:0,
    total:0,
    list:[],
    loading:true
  }


  grades$ = this.sharedService.getAllGrades('')
  gradeDivisions$

  requestForm:FormGroup= this.fb.group({
    currentSchoolId:[this.schoolId , Validators.required],
    gradeId:['',Validators.required],
    divisionId:[null],
    studentIds:[[]],
    transfferdSchoolId:['',Validators.required],
    transferType:[0]

  })


  get gradeCtr () {return this.requestForm.controls['gradeId'] as FormControl}
  get divisionCtr () {return this.requestForm.controls['divisionId'] as FormControl}
  get transferTypeCtr () {return this.requestForm.controls['transferType'] as FormControl}

  selectedSchool={ index: null, value: null} 
  
  allChecked = false
  checkboxSelected = false
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
    private settingService:SettingsService,
    private userService:UserService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.checkDashboardHeader();
  


    
  }

  getAllStudents(){
    this.students.loading=true

    this._student.getAllStudents(this.studentFilteration).subscribe(res=>{
      this.students.list = res.data 
      this.students.total = res.total     
      this.students.totalAllData = res.totalAllData
      this.students.loading=false

      // this.students.list = res.data.map(er=>er.checkboxSelected)  
      
      // this.students.list=res.data.map((student)=>{return {
      //   'id':student.id,
      //   'name':{'ar':student.name.ar,'en':student.name.en },
      //   'isSelected':false,
      //   }});
    },err=>{
      this.students.loading=false
    })
  }


  onGradeSelected(gradeId){
    this.allChecked = false;
    this.checkboxSelected = false

    this.selectedStudents = []
 
    this.studentFilteration.GradeId=  gradeId
    this.divisionCtr.setValue(null)
    this.getAllStudents()
    this.getAllSchools()
    this.gradeDivisions$ = this._grade.getGradeDivision(this.schoolId,this.studentFilteration.GradeId).pipe(map(res=>res.data))
  }

  onDivisionSelected(divisionId){
    this.allChecked = false;
    this.checkboxSelected = false
    this.studentFilteration.DivisionId = divisionId
    this.selectedStudents = []

    this.getAllStudents()
  }

  getAllSchools(){
    this.schools.list = []
    this.schools.loading=true

    this.settingService.schoolsAllowedToAcceptGroup(this.filteration.curriculumId,this.filteration).subscribe(res=>{
      this.schools.list = res.result.data 
      this.schools.total = res.result.total     
      this.schools.totalAllData = res.result.totalAllData
      this.schools.loading=false
    },err=>{
      this.schools.loading=false
    })
  }


  onSelectSchool(index, school) {    
    this.selectedSchool.index= index
    this.selectedSchool.value =school
    this.requestForm.controls['transfferdSchoolId'].setValue(school.id)
  }

  // chooseStudent(event,studentId){      
  //   if (event.checked) {
  //     this.choosenStudents.push(studentId)
  //   } else {
  //     this.choosenStudents.forEach((item, index) => {
  //       if (studentId === item) {          
  //         this.choosenStudents.splice(index, 1)
  //       }
  //     });
  //   }    

  //   if(this.choosenStudents.length ==  this.students.list.length){ 
  //     this.allChecked = true      
      
  //   }else{
  //     this.allChecked = false
      
  //   }
  //   // console.log(this.choosenStudents);
  // }


  checkAll(isChecked){
    if (isChecked) {      
      this.students.list.forEach(res=>{
        res.isSelected = true
      })
       this.selectedStudents = this.students.list.map(er=>{
        return er.id
        })
    } else {
      this.students.list.forEach(res=>{
        res.isSelected = false
      })
      this.selectedStudents  = []
    }    
    // console.log(this.choosenStudents);
  }

  sendRequestData(){
    this.spinner = true
    this.requestForm.controls['studentIds'].setValue(this.selectedStudents)
    this.divisionCtr.value ? this.transferTypeCtr.setValue(0) : this.transferTypeCtr.setValue(1)
    let data = {...this.requestForm.value}

    this._schools.postTransferGroup(data).subscribe(res=>{
      this.toastr.success(this.translate.instant('toasterMessage.requestSendSuccessfully'));
      this.spinner = false
      this.selectedStudents = []
      this.requestForm.reset()
      // this.selectedSchool = null
    },err=>{
      this.toastr.error(this.translate.instant('toasterMessage.error'));
      this.spinner = false
    })

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
