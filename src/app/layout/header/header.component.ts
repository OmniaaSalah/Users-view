import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faAngleDown, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { TranslationService } from 'src/app/core/services/translation.service';
import { UserService } from 'src/app/core/services/user.service';
import { slide } from 'src/app/shared/animation/animation';

interface MenuItem{
  id:number
  title:string
  links:{}[]
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[slide]
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  isInDashboard

  faAngleDown = faAngleDown
  faArrowLeft = faArrowLeft

  isMenuOpend= false
  activeMenuItem:MenuItem
  activeMenuItemChanged =false

  menuItems: MenuItem[] =[
    {

      id:1,
      title:'مدارس وطلاب',
      links:[
        {name: 'المدارس',url:'/dashboard/schools-and-students/schools'},
        {name: 'الطلاب', url:'/dashboard/schools-and-students/students'},
        {name: 'اولياء الامور',url:'/dashboard/schools-and-students/all-parents'},
      ]
    },
    {
      id:2,
      title:'اداره الاداء',
      links:[
        {name: 'الامتحانات',url:'/dashboard/performance-managment/'},
        {name: 'مهامى',url:'/dashboard/performance-managment/'},

      ]
    },
    {
      id:3,
      title:'ادوات مدير النظام',
      links:[
        {name: 'المستخدمين',url:'/dashboard/manager-tools/UserInformation/ViewUsersList'},
        {name: 'الادوار الوظيفيه', url:'/dashboard/manager-tools/UserRoles/ViewUserRoles'},
        {name: 'اعدادات النظام ',url:'/dashboard/managerTools/'},
        {name: 'قواءم النظام',url:'/dashboard/manager-tools/Indexes/View-SystemList'},
      ]
    },
    {
      id:4,
      title:'اداره التقارير',
      links:[
        {name: 'تقرير الطلاب',url:'/dashboard/reports-managment/students-reports'},
        {name: 'تقرير اولياء الامور', url:'/dashboard/reports-managment/'},
        {name: 'تقرير الغياب والحضور',url:'/dashboard/reports-managment/'},
        {name: 'تقرير المدارس',url:'/dashboard/reports-managment/'},
        {name: 'تقرير الدرجات', url:'/dashboard/reports-managment/degrees-reports'},
        {name: 'تقرير الموظفين',url:'/dashboard/reports-managment/'},
        {name: 'تقرير المعلمين',url:'/dashboard/reports-managment/'},
        {name: 'تقرير المواد الدراسيه', url:'/dashboard/reports-managment/'},
      ]
    },
    {
      id:5,
      title:'الاعدادات التعليميه',
      links:[
        {name: 'الاجازه السنويه',url:'/dashboard/educational-settings/AnnualHoliday/ViewSpecific/:SID'},
        {name: 'السنوات الدراسيه', url:''},
        {name: 'المواد الدراسيه',url:'/dashboard/educational-settings/Subjects/ViewSubjectList'},
        {name: 'قائمه الاستبيانات', url:'/dashboard/educational-settings/surveys'},
        {name: 'تقيمات المواد الدراسيه',url:'/dashboard/educational-settings/Assessments/View-Assements-List'},
      ]
    },
  ]

  constructor(
    private router: Router, 
    private translationService: TranslationService, 
    private authService: AuthenticationService, 
    private userService: UserService) { }


  ngOnInit(): void {

    if(this.router.url.indexOf('dashboard') > -1) this.isInDashboard = true
    
    this.router.events
    .pipe(filter( event =>event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {

      if(event.url.indexOf('dashboard') > -1){
        this.isInDashboard = true
      }
    })
  }



  logout() {
    this.userService.clear();
  }

  onSwitchLanguage() {
    this.translationService.handleLanguageChange()

  }


  openMenu(index){
    
    if(this.activeMenuItem && this.activeMenuItem?.id == index + 1){

       this.isMenuOpend = !this.isMenuOpend
      this.activeMenuItemChanged = true

    } else{
      this.activeMenuItemChanged = false
      this.activeMenuItem = this.menuItems[index];
      this.isMenuOpend = true

      setTimeout(()=>{
        this.activeMenuItemChanged = true
      },320)
    }
    this.activeMenuItem = this.menuItems[index];
    // this.activeMenuItemChanged = true
    
  }

  atclickOutside(){
    this.isMenuOpend = false
  }

  onDateSelected(e){
    console.log(e);
    
  }
}
