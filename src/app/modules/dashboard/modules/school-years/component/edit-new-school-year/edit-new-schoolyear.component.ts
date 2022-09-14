import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from 'src/app/core/services/header/header.service';
import { SchoolYearsService } from '../../service/school-years.service';
import { faArrowRight ,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-edit-new-schoolyear',
  templateUrl: './edit-new-schoolyear.component.html',
  styleUrls: ['./edit-new-schoolyear.component.scss']
})
export class EditNewSchoolyearComponent implements OnInit {

  cities: string[];
  schoolYearFormGrp:FormGroup;
  rightIcon=faArrowRight;
  exclamtionIcon=faExclamationCircle;
  constructor(private headerService:HeaderService,private translate:TranslateService,private schoolyearservise:SchoolYearsService,private router:Router,private fb: FormBuilder) { 

    this.schoolYearFormGrp= fb.group({
     
      schoolyearname:['',[Validators.required,Validators.maxLength(32)]],
      schoolyearstartdate:['',[Validators.required]],
      schoolyearenddate:['',[Validators.required]],
      weekenddays:['',[Validators.required]],
      agedeterminationdate:['',[Validators.required]],
      annualholidayname:['',[Validators.required]],
      curriculum:['',[Validators.required]],
      activateage:['',[Validators.required]],
      agerequirementtoregisterfrominsidecountry:['',[Validators.min(1),Validators.max(32)]],
      agerequirementtoregisterfromoutsidecountry:['',[Validators.min(1),Validators.max(32)]],
      class:[''],
      knownsubjectlist:['',[Validators.required]],
      subjectstatusinfinaltotal:['',[Validators.required]],
      subjectstatus:['',[Validators.required]]
  
      });
  }

  ngOnInit(): void {
    this.headerService.Header.next(
      {'breadCrump':[
          {label: this.translate.instant('breadcrumb.School Years List'),routerLink:'/dashboard/educational-settings/school-year/school-years-list'},
          {label: this.translate.instant('breadcrumb.Add New School Year')}
        ],
        mainTitle:{main: this.translate.instant('breadcrumb.Add New School Year')}
      }
      );
      this.cities=this.schoolyearservise.cities;
  }

  get schoolyearname() {
    return this.schoolYearFormGrp.controls['schoolyearname'] as FormControl;
  }

  get schoolyearstartdate() {
    return this.schoolYearFormGrp.controls['schoolyearstartdate'] as FormControl;
  }

  get schoolyearenddate() {
    return this.schoolYearFormGrp.controls['schoolyearenddate'] as FormControl;
  }

  get weekenddays() {
    return this.schoolYearFormGrp.controls['weekenddays'] as FormControl;
  }

  get agedeterminationdate() {
    return this.schoolYearFormGrp.controls['agedeterminationdate'] as FormControl;
  }
  get annualholidayname() {
    return this.schoolYearFormGrp.controls['annualholidayname'] as FormControl;
  }

  get curriculum() {
    return this.schoolYearFormGrp.controls['curriculum'] as FormControl;
  }
  get activateage() {
    return this.schoolYearFormGrp.controls['activateage'] as FormControl;
  }
  get agerequirementtoregisterfrominsidecountry() {
    return this.schoolYearFormGrp.controls['agerequirementtoregisterfrominsidecountry'] as FormControl;
  }
  get agerequirementtoregisterfromoutsidecountry() {
    return this.schoolYearFormGrp.controls['agerequirementtoregisterfromoutsidecountry'] as FormControl;
  }

  get class() {
    return this.schoolYearFormGrp.controls['class'] as FormControl;
  }
  get knownsubjectlist() {
    return this.schoolYearFormGrp.controls['knownsubjectlist'] as FormControl;
  }
  get subjectstatusinfinaltotal() {
    return this.schoolYearFormGrp.controls['subjectstatusinfinaltotal'] as FormControl;
  }
  get subjectstatus() {
    return this.schoolYearFormGrp.controls['subjectstatus'] as FormControl;
  }

}
