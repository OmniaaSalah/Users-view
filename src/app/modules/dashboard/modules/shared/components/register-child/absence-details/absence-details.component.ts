import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Filtration } from 'src/app/core/classes/filtration';
import { paginationInitialState } from 'src/app/core/classes/pagination';
import { Filter } from 'src/app/core/models/filter/filter';
import { AbsenceType, SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-absence-details',
  templateUrl: './absence-details.component.html',
  styleUrls: ['./absence-details.component.scss']
})
export class AbsenceDetailsComponent implements OnInit {

  studentId = +this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')
    // << DATA PLACEHOLDER >> //
    filtration:Filter = {...Filtration, semester:0}
    paginationState= {...paginationInitialState}

    get absenceType(){ return AbsenceType}
  
    absence ={
      attendenceDays: 0,
      absenceDays: 0,
      absenceDaysWithExecuse: 0,
      absenceDaysWithoutExecuse: 0,
      attendenceDaysPercentage: 0,
      absenceDaysPercentage: 0,
      total:0,
      totalAllData:0,
      list:[],
      loading:false
    }


    btnGroupItems=[
      {label:"الفصل الاول", active: true, value:SemesterEnum.FirstSemester},
      {label:"الفصل الاخير", active: false, value:SemesterEnum.LastSemester},
    ]

  constructor(
    private registerChildService:RegisterChildService,
    private studentService:StudentsService,
    private route: ActivatedRoute,
    ) { }



  ngOnInit(): void {
    this.getAbsenceDetails()
  }


  getAbsenceDetails(){
    this.absence.loading=true
    this.absence.list=[]
    this.studentService
    .getStudentAbsenceRecord(this.studentId||this.childId,this.filtration.semester,this.filtration)
    .pipe(map(res => res.result))
    .subscribe((res:any)=>{
      this.absence.loading=false

      
      this.absence.attendenceDays = res.attendenceDays
      this.absence.absenceDays = res.absenceDays
      this.absence.absenceDaysWithExecuse = res.absenceDaysWithExecuse
      this.absence.absenceDaysWithoutExecuse = res.absenceDaysWithoutExecuse
      this.absence.attendenceDaysPercentage = res.attendenceDaysPercentage
      this.absence.absenceDaysPercentage = res.absenceDaysPercentage
      this.absence.list = res.studentAttendenceModel.data
      this.absence.totalAllData = res.studentAttendenceModel.totalAllData
      this.absence.total =res.studentAttendenceModel.total 

    },err=> {
      this.absence.loading=false
      this.absence.total=0
    })
  }


}
