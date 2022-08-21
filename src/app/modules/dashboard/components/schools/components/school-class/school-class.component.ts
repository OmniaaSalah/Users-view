import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-school-class',
  templateUrl: './school-class.component.html',
  styleUrls: ['./school-class.component.scss']
})
export class SchoolClassComponent implements OnInit {
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight
  faPlus =faPlus
  faCheck = faCheck

  step=3
  withTracks = false

  // breadCrumb
  items: MenuItem[]=[
    {label:'قائمه المدارس '},
    {label:'الاطلاع على معلومات المدرسه'},
    {label:'تعديل صف'},
  ];

  tracks =[
    {
      name:'علمى',
      subjects:[
        {name :"الرياضيات"}
      ]
    },
    {
      name:'ادبى',
      subjects:[
        {name :"تاريخ"},
        {name :"تاريخ"}
      ]
    },
    {
      name:'علمى',
      subjects:[
        {name :"الرياضيات"},
        {name :"الرياضيات"},
        {name :"الرياضيات"}
      ]
    },
  ]


  constructor() { }

  ngOnInit(): void {
  }

  selectedDate(e){
    console.log(e);
    
  }
}
