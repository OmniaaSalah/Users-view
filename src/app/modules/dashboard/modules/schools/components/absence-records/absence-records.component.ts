import { Component, OnInit } from '@angular/core';
import { faCheck, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-absence-records',
  templateUrl: './absence-records.component.html',
  styleUrls: ['./absence-records.component.scss']
})
export class AbsenceRecordsComponent implements OnInit {

  faCheck=faCheck
  faPlus=faPlus
  faClose=faClose

  searchText=''
  addStudentsModelOpened = false

  items: MenuItem[]=[
		{label:'قائمه المدارس '},
		{label:'الاطلاع على معلومات المدرسه'},
    {label: 'قائمة الشعب'},
    {label: 'سجل الغياب'}
	];

  students=[
    {
      id:'#813155',
      firstName:"كمال",
      lastName:'أشرف',
    },
    {
      id:'#813155',
      firstName:"أشرف",
      lastName:'عماري',
    },
    {
      id:'#813155',
      firstName:"كمال",
      lastName:'حسن',
    },
    {
      id:'#813155',
      firstName:"أشرف",
      lastName:'عماري',
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

  selectedDate(e){

  }

}
