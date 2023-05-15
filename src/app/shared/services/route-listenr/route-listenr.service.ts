import { Injectable } from '@angular/core';
import { NavigationEnd, Router,ActivatedRoute, UrlSegment } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { RouteEnums } from '../../enums/route/route.enum';
import { Localization } from 'src/app/core/models/global/global.model';

interface RouteInHistory{
  title:Localization,
  url:string
}

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



routeHistory: RouteInHistory[]= this.RouteHistoryLocalStorage || []
routeHistory$ : BehaviorSubject<RouteInHistory[]> = new BehaviorSubject<RouteInHistory[]>([]);


  constructor(private activatedRoute: ActivatedRoute,private router:Router, private translate:TranslateService) { }

  ngOnInit(): void {

    let url = this.router.url
    // this.initRouteListner(url)
  }


  initRouteListner(url? : string){
    if(url) this.setActiveRoute(url)
    window.scrollTo(0, 0);

    this.router.events
    .pipe(filter( event => event instanceof NavigationEnd ))
    .subscribe((event: NavigationEnd) => {
      if(event instanceof NavigationEnd){
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        this.setActiveRoute(event.url)

        this.activeChildRoute.next(this.getRoutData('RouteKey'))

        this.manageRouteHistory()

      }else{

      }

    })

  }


  manageRouteHistory(){
    let currRouteTitle = this.getRoutData('title')
    let currRouteURL = this.previousUrl

    if(!currRouteTitle || !currRouteURL) return

    this.addToRouteHistory({url: currRouteURL, title:currRouteTitle})
  }

  addToRouteHistory(route:RouteInHistory){
    let routeIndex = this.routeHistory.findIndex(el => el.url == this.currentUrl)

    if(this.RouteHistoryLocalStorage.length > 9) this.routeHistory.shift()

    if(routeIndex > -1) {
      this.removeFromRouteHistory(routeIndex)
      this.addToRouteHistory(route)
      this.updateRouteHistory()
      return
    }

    this.routeHistory.push(route)
    this.updateRouteHistory()
  }

  removeFromRouteHistory(index){
    this.routeHistory.splice(index, 1)
    localStorage.removeItem('routeHistory')
    this.updateRouteHistory()
  }

  updateRouteHistory(){
    localStorage.setItem('routeHistory', JSON.stringify(this.routeHistory))
  }

  get RouteHistoryLocalStorage() :RouteInHistory[]{
    return   JSON.parse(localStorage.getItem('routeHistory'))
  }




  getRoutData(key:string){
    let child = this.activatedRoute.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data[key]) {
        return child.snapshot.data[key];
      } else {
        return null;
      }
    }
  }

  setActiveRoute(url: string){

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
