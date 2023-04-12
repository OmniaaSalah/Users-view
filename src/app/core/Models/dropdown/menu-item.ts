import { Observable } from "rxjs"

export interface MenuItem{
    label:string,
    icon?:string,
    routerLink?:string
    claims?:string
    disabled?: boolean
    isAllowed$?: Observable<boolean>
  }
