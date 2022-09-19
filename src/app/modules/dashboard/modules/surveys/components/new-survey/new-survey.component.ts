import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss']
})
export class NewSurveyComponent implements OnInit {

  faArrowRight = faArrowRight
  faCheck = faCheck

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: 'قائمه الاستبيانات ' ,routerLink:'/dashboard/educational-settings/surveys/',routerLinkActiveOptions:{exact: true}},
      { label: 'إنشاء استبيان جديد'},
    ],
    mainTitle: { main: this.translate.instant('dashboard.surveys.createNewSurvey') },
  }


  fileName = 'file.pdf'
  values = ['A', 'B']

  // breadCrumb
  items: MenuItem[] = [
    { label: 'قائمه الاستبيانات ' },
    { label: 'إنشاء استبيان جديد' },

  ];

  constructor(
    private layoutService: LayoutService,
    private translate: TranslateService,
    private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.changeHeaderdata(this.componentHeaderData)
    this.layoutService.changeTheme('dark')
  }

  uploadFile(e) {
    this.fileName = e.target.files[0].name
  }

}
