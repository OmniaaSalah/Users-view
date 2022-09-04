import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss']
})
export class NewSurveyComponent implements OnInit {

  faArrowRight=faArrowRight
  faCheck= faCheck

  fileName = 'file.pdf'
  values=['A','B']

    // breadCrumb
    items: MenuItem[]=[
      {label:'قائمه الاستبيانات '},
      {label:'إنشاء استبيان جديد'},

    ];
    
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.changeTheme('dark')
  }

  uploadFile(e){
    this.fileName = e.target.files[0].name
  }

}
