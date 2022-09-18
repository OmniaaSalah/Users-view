import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.scss']
})
export class SendSurveyComponent implements OnInit {


  faCheck = faCheck
  faArrowRight = faArrowRight
  faArrowLeft = faArrowLeft
  parentsModelOpened = false


  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات ' },
      { label: 'إرسال استبيان أولياء الأمور' },
    ],
    mainTitle: { main: this.translate.instant('dashboard.surveys.sendSurveyToParents') }
  }

  step = 1


  parentsList = [
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
  selectedParents = [
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
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark')
  }

  addParents() {
    this.parentsModelOpened = false
  }

  selectedDate(e) {
    console.log(e);

  }

  openparentsModel() {
    this.parentsModelOpened = true
  }
}
