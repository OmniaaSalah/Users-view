import { Injectable ,inject} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { ProhabitionType, RegistrationStatus, StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsReportsService {
  studentsStatus = []
  prohibitionTypeList=[]
  lang = inject(TranslationService).lang;
  constructor(private translate:TranslateService,private http: HttpHandlerService,
    private tableLoaderService: LoaderService) {
    this.studentsStatus = [
      {
        value:RegistrationStatus.Registered,
        name: this.translate.instant("shared.allStatus.Registered")
      },
      // {
      //   value:RegistrationStatus.Unregestered,
      //   name: this.translate.instant("shared.allStatus.Unregestered")
      // },
      {
        value:RegistrationStatus.Deleted,
        name:this.translate.instant("shared.allStatus.Deleted")
      },
      {
        value: RegistrationStatus.ReEnrolment,
        name: this.translate.instant("shared.allStatus.ReEnrolment")
      },
      {
        value: RegistrationStatus.Withdrawal,
        name: this.translate.instant("shared.allStatus.Withdrawal")
      }
    ];
    this.prohibitionTypeList = [
      {
        value:ProhabitionType.CertificateFromSPEA,
        name: this.translate.instant("dashboard.students.ForbiddenFromCertificatefromAuthority")
      },
      {
        value:ProhabitionType.CertificateFromSchool,
        name:this.translate.instant("dashboard.students.ForbiddenFromCertificatefromSchool")
      },
      {
        value: ProhabitionType.WithdrawingFromSPEA,
        name: this.translate.instant("dashboard.students.ForbiddenFromWithdrowfromAuthority")
      },
      {
        value: ProhabitionType.WithdrawingFromSchool,
        name: this.translate.instant("dashboard.students.ForbiddenFromWithdrowfromSchool")
      }
    ];
  }


  tabelColumns = [
    {
      name:this.translate.instant('dashboard.students.daleelNumber1'),
      isSelected: true,
      sortField:'StudentDaleelNumber'
    },
    {
      name:this.translate.instant('dashboard.students.daleelNumber2'),
      isSelected: true,
      sortField:'StudentDaleelNumber'
    },
    {
      name:this.translate.instant('dashboard.students.manhalNumber'),
      isSelected: true,
      sortField:'ManhalNumber'
    },
    {

      name: this.translate.instant('dashboard.schools.student') ,
      isSelected: true,
      sortField: this.lang=='ar' ? 'ArabicName' :'EnglishName'
    },
    {

      name: this.translate.instant('Students nickname'),
      isSelected: true,
      sortField: this.lang=='ar' ? 'ArabicSurName' :'EnglishSurName'
    },
    {

      name:this.translate.instant('dashboard.parents.parentName'),
      isSelected: true,
      sortField: this.lang=='ar' ? 'ArabicGuardianName' :'EnglishGuardianName'
    },
    {

      name: this.translate.instant('School'),
      isSelected: true,
      sortField: this.lang=='ar' ? 'ArabicSchoolName' :'EnglishSchoolName'

    },
    {

      name: this.translate.instant('shared.grade'),
      isSelected: false,
      sortField: this.lang=='ar' ? 'ArabicGradeName' :'EnglishGradeName'

    },
    {

      name:this.translate.instant('shared.division'),
      isSelected: false,
      sortField: this.lang=='ar' ? 'ArabicDivisionName' :'EnglishDivisionName'
    },
    {
      name: this.translate.instant('shared.Identity Number'),
      isSelected: false,
      sortField:'StudentEmiratesNumber'
    },
    {
      name: this.translate.instant('dashboard.parents.ChildWithoutNationality'),
      isSelected: false,
      sortField: this.lang=='ar' ? 'ReasonForNotHavingEmiratesArabicName' :'ReasonForNotHavingEmiratesEnglishName'
    },
    {

      name: this.translate.instant('dashboard.schools.SchoolCurriculum'),
      isSelected: false,
      sortField: this.lang=='ar' ? 'CurriculumAr' :'CurriculumEn'
    },
    {

      name: this.translate.instant('dashboard.parents.registedDate'),
      isSelected: false,
      sortField:'DateOfAcceptance'
    },
    {
      name: this.translate.instant('sign up.Birthday'),
      isSelected: false,
      sortField:'BirthDate'
    },
    {
      name: this.translate.instant('shared.age') ,
      isSelected: false,
      sortField:'BirthDate'
    },
    {
      name: this.translate.instant('shared.status') ,
      isSelected: false,
      sortField:'StudentStatus'
    },
    {
      name: this.translate.instant('Active') ,
      isSelected: false,
      sortField:''
    },
    {
      name: this.translate.instant('dashboard.students.FromSpetialAbilitiesPeople'),
      isSelected: false,
      sortField:'IsSpecialAbilities'
    },
    {
      name: this.translate.instant('dashboard.students.Citizen'),
      isSelected: false,
      sortField:''
    },
    {
      name: this.translate.instant('shared.gender'),
      isSelected: false,
      sortField:'Gender'
    },
    {
      name: this.translate.instant('shared.state'),
      isSelected: false,
      sortField:'AddressState'
    },
    {
      name: this.translate.instant('shared.city'),
      isSelected: false,
      sortField:'AddressCity'
    },
    {
      name: this.translate.instant('Nationality'),
      isSelected: false,
      sortField: this.lang=='ar' ? 'NationalityCategoryAr' :'NationalityCategoryEn'
    },
    {
      name: this.translate.instant('dashboard.students.StudentCategory'),
      isSelected: false,
      sortField:'NationalityCategoryIndexCode'
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
            [this.translate.instant('dashboard.students.daleelNumber1')]: student?.daleelId ? student?.daleelId : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.daleelNumber2')]: student?.daleelId ? student?.id : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.manhalNumber')]: student?.manhalNumber ? student?.manhalNumber : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.schools.student')]: student?.student?.name ? student?.student?.name[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('Students nickname')]:student?.surName ? student?.surName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.parentName')]: student?.guardianName ? student?.guardianName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('School')]: student?.schoolName ? student?.schoolName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.grade')]:student?.gradeName ? student?.gradeName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.division')]:student?.divisionName ? student?.divisionName[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.Identity Number')]: student?.emiratesId ? student?.emiratesId :this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.ChildWithoutNationality')]:student?.reasonForNotHavingEmiratesId[this.lang] ? student?.reasonForNotHavingEmiratesId[this.lang] : this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.schools.SchoolCurriculum')]:student?.curriculumName ? student?.curriculumName[this.lang] :this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.parents.registedDate')]: student?.dateOfAcceptance ? student?.dateOfAcceptance :this.translate.instant('shared.notFound'),
            [this.translate.instant('sign up.Birthday')]: student?.birthDate ? student?.birthDate :this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.age')]: student?.age ? student?.age :this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.status')]: student?.registrationStatus ? this.translate.instant('shared.allStatus.'+student?.registrationStatus) :this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.FromSpetialAbilitiesPeople')]: student?.isSpecialAbilities ? this.translate.instant('true') :this.translate.instant('false'),
            [this.translate.instant('dashboard.students.Citizen')]: student?.local ? this.translate.instant('true') :this.translate.instant('false'),
            [this.translate.instant('shared.gender')]: student?.gender ? this.translate.instant('shared.genderType.'+student?.gender):this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.state')]: student?.state ? student?.state :this.translate.instant('shared.notFound'),
            [this.translate.instant('shared.city')]: student?.city ? student?.city :this.translate.instant('shared.notFound'),
            [this.translate.instant('Nationality')]: student?.nationality[this.lang] ? student?.nationality[this.lang] :this.translate.instant('shared.notFound'),
            [this.translate.instant('dashboard.students.StudentCategory')]: student?.studentCategory ? this.convertStudentCategory(student?.studentCategory) :this.translate.instant('shared.notFound')

          }
        })
      }))
  }

  convertStudentCategory(list)
  {
    var studentCategory=[];
    list.forEach(element => {
      studentCategory.push(this.translate.instant('shared.allStatus.'+element))
    });
    return studentCategory;
  }
}
