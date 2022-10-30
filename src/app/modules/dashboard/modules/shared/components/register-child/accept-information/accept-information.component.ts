import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-accept-information',
  templateUrl: './accept-information.component.html',
  styleUrls: ['./accept-information.component.scss']
})
export class AcceptInformationComponent implements OnInit {
  @Input('mode') mode : 'edit'| 'view'= 'view'

  @Input('formGroup') studentForm:FormGroup
  
  booleanOptions = this.sharedService.booleanOptions

  constructor(
    public childService:RegisterChildService,
    private sharedService:SharedService) { }

  student$: Observable<Student> = this.childService.Student$

  ngOnInit(): void {
  }

}
