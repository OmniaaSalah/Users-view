import { Injectable ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsReportsService {

  studentsStatus = []
  lang = inject(TranslationService).lang;
  constructor(private translate:TranslateService,private http: HttpHandlerService,
    private tableLoaderService: LoaderService) {
    this.studentsStatus = [
      {
        value:StatusEnum.Registered,
        name: this.translate.instant("shared.allStatus.Registered")
      },
      // {
      //   value:StatusEnum.Unregestered,
      //   name: this.translate.instant("shared.allStatus.Unregestered")
      // },
      {
        value:StatusEnum.Deleted,
        name:this.translate.instant("shared.allStatus.Deleted")
      },
      {
        value: StatusEnum.ReEnrolment,
        name: this.translate.instant("shared.allStatus.ReEnrolment")
      },
      {
        value: StatusEnum.Withdrawal,
        name: this.translate.instant("shared.allStatus.Withdrawal")
      }
    ];
  }
 

  tabelColumns = [
    {
      name:this.translate.instant('dashboard.students.daleelNumber'),
      isSelected: true,
      isDisabled: true,
    },
    {
      name:this.translate.instant('dashboard.students.manhalNumber'),
      isSelected: true,
      isDisabled: true,
    },
    {
     
      name: this.translate.instant('dashboard.issue of certificate.student name') ,
      isSelected: true,
      isDisabled: true,
    },
    {
     
      name: this.translate.instant('Students nickname'),
      isSelected: true,
      isDisabled: true,
    },
    {

      name:this.translate.instant('dashboard.parents.parentName'),
      isSelected: true,
      isDisabled: true,
    },
    {
  
      name: this.translate.instant('dashboard.issue of certificate.schoolName'),
      isSelected: true,
      isDisabled: true,
    },
    {
   
      name: this.translate.instant('shared.gradeName'),
      isSelected: false,
      isDisabled: false,
    },
    {

      name:this.translate.instant('shared.divisionName'),
      isSelected: false,
      isDisabled: false,
    },
    {
      name: this.translate.instant('shared.Identity Number'),
      isSelected: false,
      isDisabled: false,
    },
    {
      name: this.translate.instant('TheReasonForLackOfIdentification'),
      isSelected: false,
      isDisabled: false,
    },
    {

      name: this.translate.instant('shared.curriculumName'),
      isSelected: false,
      isDisabled: false,
    },
    {
   
      name: this.translate.instant('dashboard.parents.registedDate'),
      isSelected: false,
      isDisabled: false,
    },
    {
      name: this.translate.instant('sign up.Birthday'),
      isSelected: false,
      isDisabled: false,
    },
    {
      name: this.translate.instant('shared.age') ,
      isSelected: false,
      isDisabled: false,
    },
    {
      name: this.translate.instant('shared.status') ,
      isSelected: false,
      isDisabled: false,
    },
    {
      name: this.translate.instant('Active') ,
      isSelected: false,
      isDisabled: false,
    },
    {
      name: this.translate.instant('dashboard.students.FromSpetialAbilitiesPeople'),
      isSelected: false,
      isDisabled: false,
    }
  ];
  getAllStudents(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.post('/Student/student-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }

  studentsToExport(filter?:Partial<Filter>)
  {
    return this.http.post('/Student/student-report',filter)
    .pipe(
      map(res=>{
        return res.studentDetails.data.map(student =>{
          return {
            [this.translate.instant('dashboard.students.daleelNumber')]: student?.daleelId ? student?.daleelId : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.manhalNumber')]: student?.manhalNumber ? student?.manhalNumber : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.issue of certificate.student name')]: student?.name? student?.name[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('Students nickname')]:student?.surName ? student?.surName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.parentName')]: student?.guardianName ? student?.guardianName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.issue of certificate.schoolName')]: student?.schoolName ? student?.schoolName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.gradeName')]:student?.gradeName ? student?.gradeName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.divisionName')]:student?.divisionName ? student?.divisionName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.Identity Number')]: student?.emiratesId ? student?.emiratesId :this.translate.instant('shared.notFound'),
            [this.translate.instant('TheReasonForLackOfIdentification')]:student?.reasonForNotHavingEmiratesId[this.lang] ? student?.reasonForNotHavingEmiratesId[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.curriculumName')]:student?.curriculumName ? student?.curriculumName[this.lang] :this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.registedDate')]: student?.dateOfAcceptance ? student?.dateOfAcceptance :this.translate.instant('shared.notFound'),
            [this.translate.instant('sign up.Birthday')]: student?.birthDate ? student?.birthDate :this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.age')]: student?.age ? student?.age :this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.status')]: student?.registrationStatus ? student?.registrationStatus :this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.FromSpetialAbilitiesPeople')]: student?.isChildOfAMartyr ? student?.isChildOfAMartyr :this.translate.instant('shared.notFound')

          }
        })
      }))
  }
}
