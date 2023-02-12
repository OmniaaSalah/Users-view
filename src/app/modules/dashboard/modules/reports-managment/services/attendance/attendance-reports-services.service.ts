import { Injectable } from '@angular/core';
import { Filter } from 'src/app/core/models/filter/filter';
import { HttpHandlerService } from 'src/app/core/services/http/http-handler.service';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { finalize, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportsServicesService {

  constructor( private tableLoaderService: LoaderService ,private http: HttpHandlerService) { }
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
      key: 'studentDaleelNumber',
      name: { en: 'The number of absent students for each class', ar: 'عدد الطلاب الغائبين لكل شعبة' },
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
      name: { en: 'Manhal system identification number', ar: 'الرقم التعريفي بنظام منهل' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: '',
      name: { en: 'The number of attendees', ar: 'عدد الحضور ' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: '',
      name: { en: 'absence number', ar: 'عدد الغياب' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key:'',
      name: { en: 'Attendance rate', ar: 'نسبة الحضور' },
      isSelected: false,
      isDisabled: false,
    },
    {
      key: '',
      name: { en: 'Absenteeism rate', ar: 'نسبة الغياب' },
      isSelected: false,
      isDisabled: false,
    }
  ];

  getAllAbbsenceAndAttendance(filter?:Partial<Filter>){
    this.tableLoaderService.isLoading$.next(true)

    return this.http.get('/Student/student-abbsent-report',filter)
    .pipe(
      take(1),
      finalize(()=> {
        this.tableLoaderService.isLoading$.next(false)
      }))
  }
}
