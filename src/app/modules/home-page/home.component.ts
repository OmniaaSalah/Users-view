import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { UserEnum } from 'src/app/shared/enums/user.enum';

@Component({
  selector: 'app-current-user',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  faChevronDown= faChevronDown
  faChevronUp=faChevronUp
  userType= UserEnum.U_SHARJAH_AUTHORITY
  searchText

  cardsContentStatus=[
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
  ]

  cardsHoverStatus=[
    {active : false},
    {active : false},
    {active : false},
    {active : false},
    {active : false},
  ]

  firstChildHoverd = false
  lastChildHoverd = false

  get userEnum() { return UserEnum}

  cards=[
    {
      image:'assets/images/home/educational-setting.png',
      content:{
        header: {
          title:"الاعدادات التعليميه",
          bgColor:'#EF8071'
        },
        list: [
          {label:'الاجازات السنويه', icon:'assets/images/home/educational-setting/calender.svg',url:'dashboard/AnnualHoliday/ViewSpecific/:SID'},
          {label:'السنوات الدراسيه', icon:'assets/images/home/educational-setting/calender-user.svg'},
          {label:'المواد الدراسيه', icon:'assets/images/home/educational-setting/micro.svg',url:'dashboard/Subjects/ViewSubjectList'},
          {label:'قائمه الاستبيانات', icon:'assets/images/home/educational-setting/note-list.svg'},
          {label:'تقيمات المواد الدراسيه', icon:'assets/images/home/educational-setting/note-marked.svg'},
        ]
      }
     
    },
    
    {
      image:'assets/images/home/reports-managment.png',
      content:{
        header: {
          title: 'اداره التقارير',
          bgColor:'#CD578A'
        },
        list: [
          {label:'تقرير الطلاب', icon:'assets/images/home/report-managment/report-user.svg'},
          {label:'تقرير اولاياء الأمور', icon:'assets/images/home/report-managment/report.svg'},
          {label:'تقرير الغياب والحضور', icon:'assets/images/home/report-managment/report-edge.svg'},
          {label:'تقرير المدارس', icon:'assets/images/home/report-managment/report-marked.svg'},
          {label:'تقرير الدرجات', icon:'assets/images/home/report-managment/report-content.svg'},
        ]
      }
    },

    {
      image:'assets/images/home/schools-and-students.png',
      content:{
        header: {
          title:'مدارس وطلاب',
          bgColor:'#5CD0DF'
        },
        list: [
          {label:'المدارس', icon:'assets/images/home/schools-students/graduation-cap.svg', url:'/dashboard/schools-and-students/schools'},
          {label:'الطلاب', icon:'assets/images/home/schools-students/user-graduate.svg'},
          {label:'اولياء الامور', icon:'assets/images/home/schools-students/parents.svg'},
        ]
      }
    },

    {
      image:'assets/images/home/manager-tools.png',
      content:{
        header: {
          title: 'ادوات مدير النظام',
          bgColor:'#D644B1'
        },
        list: [
          {label:'الامتحانات', icon:'assets/images/home/performance-managment/list.svg'},
          {label:'مهامى', icon:'assets/images/home/performance-managment/note-list.svg'},
        ]
      }
    },

    {
      image:'assets/images/home/performance-managment.png',
      content:{
        header: {
          title:'اداره الاداء',
          bgColor:'#F8C073'
        },
        list: [
          {label:'المستخدمين', icon:'assets/images/home/system-manager-tools/users.svg'},
          {label:'الادوار الوظيفيه', icon:'assets/images/home/system-manager-tools/user.svg'},
          {label:'اعدادات النظام ', icon:'assets/images/home/system-manager-tools/fix.svg'},
          {label:'قوائم النظام', icon:'assets/images/home/system-manager-tools/list.svg'},
        ]
      }
      
    },



  ]
  
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onHoverd(index){
    this.cardsHoverStatus[index].active = true
  }

  onLeaved(index){
    this.cardsHoverStatus[index].active = false
    this.cardsContentStatus[index].active = false
  }

  onFirstChildHoverd(){
    this.firstChildHoverd = true
  }

  onFirstChildLeaved(){
      this.firstChildHoverd = false
  }

  onLastChildHoverd(){
    this.lastChildHoverd = true
  }

  onLastChildLeaved(){

    this.lastChildHoverd = false
  }

}
