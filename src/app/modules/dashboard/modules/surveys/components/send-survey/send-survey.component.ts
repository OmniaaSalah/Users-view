import { Component, OnInit } from '@angular/core';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { LayoutService } from 'src/app/layout/services/layout/layout.service';

@Component({
  selector: 'app-send-survey',
  templateUrl: './send-survey.component.html',
  styleUrls: ['./send-survey.component.scss']
})
export class SendSurveyComponent implements OnInit {


  faCheck= faCheck
  faArrowRight = faArrowRight
  parentsModelOpened =false

  // breadCrumb
  items: MenuItem[]=[
    {label:'قائمه الاستبيانات '},
    {label:'إرسال استبيان أولياء الأمور'},

  ];

  step=1
  
  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.changeTheme('dark')
  }


  selectedDate(e){
    console.log(e);
    
  }

  openparentsModel(){
      this.parentsModelOpened= true
  }
}
