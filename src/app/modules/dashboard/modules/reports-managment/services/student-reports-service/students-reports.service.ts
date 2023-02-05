import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { StatusEnum } from 'src/app/shared/enums/status/status.enum';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsReportsService {

  studentsStatus = []
  constructor(private translate:TranslateService,private http: HttpHandlerService,
    private tableLoaderService: LoaderService) {
    this.studentsStatus = [
      {
        value:StatusEnum.Registered,
        name: {
          en: this.translate.instant("shared.allStatus.Registered"),
          ar: this.translate.instant("shared.allStatus.Registered")
        },
      },
      {
        value:StatusEnum.Unregestered,
        name: {
          en: this.translate.instant("shared.allStatus.Unregestered"),
          ar: this.translate.instant("shared.allStatus.Unregestered")
        }
      },
      {
        value: StatusEnum.WithdrawnRejected,
        name: {
          en: this.translate.instant("shared.allStatus.WithdrawnRejected"),
          ar: this.translate.instant("shared.allStatus.WithdrawnRejected")
        }
      },
      {
        value:StatusEnum.Deleted,
        name: {
          en: this.translate.instant("shared.allStatus.Deleted"),
          ar: this.translate.instant("shared.allStatus.Deleted")
        }
      },
      {
        value: StatusEnum.Withdrawn,
        name: {
          en: this.translate.instant("shared.allStatus.Withdrawn"),
          ar: this.translate.instant("shared.allStatus.Withdrawn")
        }
      },
    ];
  }
  //  this.translate.instant("shared.allStatus.Deleted") put this instead of object and translate it in ar and en 

  tabelColumns = [
    {
      key: 'studentDaleelNumber',
      name:{en:'student Daleel Number',ar:'الرقم التعريفي بنظام دليل '},
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'name', // make itdynamic based on bbackend object key on all objects
      name: { en: 'Student Name - Nick Name', ar: 'اسم الطالب - الكنية' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'guardianName',
      name: { en: 'Parent Name', ar: 'اسم الأب' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'currentSchoolName',
      name: { en: 'School Name', ar: 'اسم المدرسة' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'gradeName',
      name: { en: 'Grade', ar: 'الصف' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'divisionName',
      name: { en: 'Division', ar: 'الشعبة' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key:'studentEmiratesNumber',
      name: { en: 'Student Emirates Number', ar: 'رقم الهوية' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: '',
      name: { en: 'The reason why the identity does not exist', ar: 'سبب عدم وجود الهوية' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: '',
      name: { en: 'Curriculum', ar: 'المنهج' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key:'',
      name: { en: 'Date Of Registrationr', ar: 'تاريخ التسجيل' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: 'birthDate',
      name: { en: 'Date of Birth', ar: 'تاريخ الميلاد' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: '',
      name: { en: 'Age', ar: 'العمر' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: '',
      name: { en: 'Status', ar: 'الحالة' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: 'isSpecialAbilities',
      name: { en: 'People of determination', ar: 'من اصحاب الهمم' },
      isSelected: false,
      isDisabled: false,
    }
  ];
  getAllStudents(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.get('/Student/student-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }
}
