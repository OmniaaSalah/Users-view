import { Injectable } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, Subject, tap } from 'rxjs';
import { RouteEnums } from '../../enums/route/route.enum';

@Injectable({
  providedIn: 'root'
})
export class RouteListenrService {

  private activeRoute = new BehaviorSubject<RouteEnums|''>(RouteEnums.SCHOOLS_AND_STUDENTS)
  private activeChildRoute = new BehaviorSubject<RouteEnums|''>(RouteEnums.Schools)
  activeRoute$ = this.activeRoute.asObservable()
  activeChildRoute$ = this.activeChildRoute.asObservable()

  previousUrl=''
  currentUrl=''

  constructor(private activatedRoute: ActivatedRoute,private router:Router, private translate:TranslateService) { }

  ngOnInit(): void {
    
    let url = this.router.url
    // this.initRouteListner(url)
  }


  initRouteListner(url? : string){
    if(url) this.checkRouteInclude(url)
    window.scrollTo(0, 0);

    this.router.events
    .pipe(filter( event => event instanceof NavigationEnd ))
    .subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationEnd){
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.checkRouteInclude(event.url)

        this.activeChildRoute.next(this.getRoutData())
      }else{
        
      }

    })

  }

  getRoutData(){
    let child = this.activatedRoute.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data['RouteKey']) {
        return child.snapshot.data['RouteKey'];
      } else {
        return null;
      }
    }
  }
  
  checkRouteInclude(url: string){

    if(url.indexOf('schools-and-students') > -1){        
      this.activeRoute.next(RouteEnums.SCHOOLS_AND_STUDENTS)

    } else if(url.indexOf('performance-managment') > -1){
      this.activeRoute.next(RouteEnums.PEFORMANCE_MANAGMENT)

    }else if(url.indexOf('educational-settings') > -1){
      this.activeRoute.next(RouteEnums.EDUCATIONAL_SETTING)

    }else if(url.indexOf('manager-tools') > -1){
      this.activeRoute.next(RouteEnums.MANAGAR_TOOLS)

    }else if(url.indexOf('reports-managment') > -1){
      this.activeRoute.next(RouteEnums.REPORTS_MANAGEMENT)
      
    }else if(url.indexOf('communication-managment') > -1){
      this.activeRoute.next(RouteEnums.COMMUNICATION_MANAGMENT)

    }else if(url.indexOf('school-management') > -1){
      this.activeRoute.next(RouteEnums.School_Management)

    }else if(url.indexOf('schoolEmployee-management') > -1){
      this.activeRoute.next(RouteEnums.SchoolEmployee_Management)

    }
    else if(url.indexOf('grades-and-divisions') > -1){
      this.activeRoute.next(RouteEnums.Grades_Divisions_Management)

    }else if(url.indexOf('student-management') > -1){
      this.activeRoute.next(RouteEnums.Student_Management)

    }else if(url.indexOf('school-performance-managent') > -1){
      this.activeRoute.next(RouteEnums.School_PerformanceManagent)

    }
    else{
      this.activeRoute.next('')
    }
  }
}
