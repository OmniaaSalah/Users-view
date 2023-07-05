
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomRouteReuseStrategy implements RouteReuseStrategy {

  private storedRoutes = new Map<string, DetachedRouteHandle>();
  private isUserLogged
  constructor(private userService:UserService) {

    this.userService.isUserLogged$.subscribe(isLogged =>{
      this.isUserLogged = isLogged
    })
  }



  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if(!this.isUserLogged){
      this.storedRoutes.clear()
      return false
    }

    return route?.data['reuse'] && route.routeConfig.component?.prototype?.name =='LayoutComponent';
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRoutes.set(route.routeConfig.component?.prototype?.name , handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.component?.prototype?.name);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

    return this.storedRoutes.get(route.routeConfig.component?.prototype?.name);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
