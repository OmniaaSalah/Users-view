import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() { }
  tabelColumns = [
    {
      key: 'studentDaleelNumber',
      name:{en:'The number of lessons',ar:'عدد الحصص الدراسية '},
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'name', // make itdynamic based on bbackend object key on all objects
      name: { en: 'Area', ar: 'المنطقة' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'studentNumber',
      name: { en: 'number of subjects', ar: 'عدد المواد الدراسيّة' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'currentSchoolName',
      name: { en: 'School Name', ar: 'اسم المدرسة' },
      isSelected: true,
      isDisabled: true,
    },
  ];
}
