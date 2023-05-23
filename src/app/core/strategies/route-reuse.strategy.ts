
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';


export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route?.data['reuse'] && route.routeConfig.component?.prototype?.constructor?.name =='LayoutComponent';
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.storedRoutes.set(route.routeConfig.component?.prototype?.constructor?.name , handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.component?.prototype?.constructor?.name);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {

    return this.storedRoutes.get(route.routeConfig.component?.prototype?.constructor?.name);
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
