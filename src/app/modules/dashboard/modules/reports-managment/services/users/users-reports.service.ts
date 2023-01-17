import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersReportsService {

  constructor() { }


  tabelColumns = [
    {
      key: 'fullName',
      name:{en:'Employee Name',ar:'اسم الموظف'},
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'email', // make itdynamic based on bbackend object key on all objects
      name: { en: 'Email', ar: 'البريد الألكتروني' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'emiratesIdNumber',
      name: { en: 'The number of orders', ar: 'عدد الطلبات' },
      isSelected: true,
      isDisabled: true,
    },
    {
      key: 'phoneNumber',
      name: { en: 'Phone Number', ar: 'رقم الهاتف' },
      isSelected: true,
      isDisabled: true,
    },
  ];
}
