import { Component, OnInit } from '@angular/core';
import { faCheck, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { iheader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header/header.service';

@Component({
  selector: 'app-absence-records',
  templateUrl: './absence-records.component.html',
  styleUrls: ['./absence-records.component.scss']
})
export class AbsenceRecordsComponent implements OnInit {

  // << ICONS >> //
  faCheck=faCheck
  faPlus=faPlus
  faClose=faClose
  

  // << conditions >> //
  addStudentsModelOpened = false
  

  // << DASHBOARD HEADER DATA >> //
  componentHeaderData: iheader={
    breadCrump: [
      {label:'قائمه المدارس '},
      {label:'الاطلاع على معلومات المدرسه'},
      {label: 'قائمة الشعب'},
      {label: 'سجل الغياب'}
		],
		mainTitle:{ main: this.translate.instant('dashboard.surveys.createNewSurvey') },
	}


  // << DATA SOURCE >> //
  studentsList=[
    {
      id: '#1',
      firstName: "كمال",
      lastName: 'أشرف',
    },
    {
      id: '#2',
      firstName: "أشرف",
      lastName: 'عماري',
    },
    {
      id: '#3',
      firstName: "كمال",
      lastName: 'حسن',
    },
    {
      id: '#4',
      firstName: "أشرف",
      lastName: 'عماري',
    },
    {
      id: '#5',
      firstName: "كمال",
      lastName: 'أشرف',
    },
    {
      id: '#6',
      firstName: "أشرف",
      lastName: 'عماري',
    },
  ]
  absencStudents = [
    {
      id: '#813155',
      firstName: "كمال",
      lastName: 'أشرف',
    },
    {
      id: '#813155',
      firstName: "أشرف",
      lastName: 'عماري',
    },
    {
      id: '#813155',
      firstName: "كمال",
      lastName: 'حسن',
    },

  ]


  // << FORMS >> //
  searchText=''
  selectedStudents=[]



  constructor(
    private translate: TranslateService,
    private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

  selectedDate(e) {

  }

  addStudentsToAbsenceRecords(){
    
    this.absencStudents = [...this.absencStudents,...this.selectedStudents]
    
    this.addStudentsModelOpened = false
  }

  deleteRecord(index) {
    this.absencStudents.splice(index, 1)
  }

}
