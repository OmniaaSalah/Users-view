import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { ClaimsEnum } from 'src/app/shared/enums/claims/claims.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-identity-info',
  templateUrl: './identity-info.component.html',
  styleUrls: ['./identity-info.component.scss']
})
export class IdentityInfoComponent implements OnInit {
  @Input('formGroup') studentForm:FormGroup
  mode
  student$: Observable<Student> = this.childService.Student$
  countries$ = this.countriesService.getCountries()
  genderOptions=this.sharedService.genderOptions
  religions$= this.sharedService.getReligion()

  allowToEditIdentityInfo = this.userService.isUserAllowedTo(ClaimsEnum.S_UpdateStudentIdentity)
  
  constructor(
    private sharedService: SharedService,
    private countriesService:CountriesService,
    public childService:RegisterChildService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
  }

}
