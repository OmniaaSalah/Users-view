import { Component, OnInit } from '@angular/core';
import { faCheck, faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { HeaderObj } from 'src/app/core/models/header-obj';
import { HeaderService } from 'src/app/core/services/header/header.service';

@Component({
  selector: 'app-absence-records',
  templateUrl: './absence-records.component.html',
  styleUrls: ['./absence-records.component.scss']
})
export class AbsenceRecordsComponent implements OnInit {

  faCheck = faCheck
  faPlus = faPlus
  faClose = faClose
  selectedStudents = []
  searchText = ''
  addStudentsModelOpened = false

  componentHeaderData: HeaderObj = {
    breadCrump: [
      { label: 'قائمه المدارس ' },
      { label: 'الاطلاع على معلومات المدرسه' },
      { label: 'قائمة الشعب' },
      { label: 'سجل الغياب' }
    ],
    mainTitle: { main: this.translate.instant('dashboard.surveys.createNewSurvey') },
  }

  studentsList = [
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
  constructor(
    private translate: TranslateService,
    private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
  }

  selectedDate(e) {

  }

  addStudentsToAbsenceRecords() {
    console.log(this.selectedStudents);

    this.absencStudents = [...this.absencStudents, ...this.selectedStudents]

    this.addStudentsModelOpened = false
  }

  deleteRecord(index) {
    this.absencStudents.splice(index, 1)
  }

}
