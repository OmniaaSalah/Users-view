import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterChildService {

  onEditMode$= new BehaviorSubject(false)

  constructor() { }
}
