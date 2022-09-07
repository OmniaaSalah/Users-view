import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faArrowLeft, faArrowRight, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { HeaderObj } from 'src/app/core/Models/header-obj';
import { HeaderService } from 'src/app/core/services/Header/header.service';


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

  componentHeaderData: HeaderObj={
		breadCrump: [
      {label:'قائمه المدارس '},
      {label:'الاطلاع على معلومات المدرسه'},
      {label:'تعديل صف'},
		],
		mainTitle:{ main: 'مدرسه الشارقه الابتدائيه' },
    subTitle: {main: this.translate.instant('dashboard.schools.editClass') , sub:'(الصف الرابع)'}
	}

  step=3
  withTracks = false
  isModelOpened=false



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

  inputSwitch =new FormControl(false)


  constructor(
    private translate: TranslateService,
    private headerService:HeaderService
    ) { }

  ngOnInit(): void {
        this.headerService.changeHeaderdata(this.componentHeaderData)
  }

  selectedDate(e){
    console.log(e);
    
  }

  openAddClassModel(){
    this.isModelOpened =true
  }
}
