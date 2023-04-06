import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
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

  lang = inject(TranslationService).lang
  @Input('formGroup') studentForm:FormGroup
  @Input() mode : 'edit'| 'view'= 'view'

  student$: Observable<Student> = this.childService.Student$
  countries$ = this.countriesService.getCountries()
  genderOptions=this.sharedService.genderOptions
  religions$= this.sharedService.getReligion()

  allowToEditIdentityInfo = this.cliamsService.isUserAllowedTo(ClaimsEnum.S_UpdateStudentIdentity)

  constructor(
    private sharedService: SharedService,
    private countriesService:CountriesService,
    public childService:RegisterChildService,
    private userService:UserService,
    private cliamsService:ClaimsService,
  ) { }

  ngOnInit(): void {
  }

}
