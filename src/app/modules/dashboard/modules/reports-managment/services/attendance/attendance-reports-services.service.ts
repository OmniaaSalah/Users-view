import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportsServicesService {

  constructor() { }
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
}
