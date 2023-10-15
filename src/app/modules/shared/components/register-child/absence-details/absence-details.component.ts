import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { BaseSearchModel } from 'src/app/core/models/filter-search/base-search-model';
import { paginationInitialState } from 'src/app/core/helpers/pagination';
import { SearchModel } from 'src/app/core/models/filter-search/filter-search.model';
import { AbsenceType, SemesterEnum } from 'src/app/shared/enums/global/global.enum';
import { StudentsService } from '../../../../students/services/students/students.service';
import { StudentService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-absence-details',
  templateUrl: './absence-details.component.html',
  styleUrls: ['./absence-details.component.scss']
})
export class AbsenceDetailsComponent implements OnInit {

  studentId = this.route.snapshot.paramMap.get('id')
  childId = this.route.snapshot.paramMap.get('childId')
    // << DATA PLACEHOLDER >> //
    filtration:SearchModel = {...BaseSearchModel, semester:0}
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
      {label:this.translate.instant('shared.firstSemester'), active: true, value:SemesterEnum.FirstSemester},
      {label:this.translate.instant('shared.lastSemester'), active: false, value:SemesterEnum.LastSemester},
    ]

  constructor(
    private registerChildService:StudentService,
    private studentService:StudentsService,
    private route: ActivatedRoute,
    private translate:TranslateService
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
