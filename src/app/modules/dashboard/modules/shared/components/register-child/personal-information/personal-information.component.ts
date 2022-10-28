import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable, share } from 'rxjs';
import { Student } from 'src/app/core/models/student/student.model';
import { PermissionsEnum } from 'src/app/shared/enums/permissions/permissions.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { StudentsService } from '../../../../students/services/students/students.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  // @Input('student') student
  @Input('mode') mode : 'edit'| 'view'= 'view'
  @Input('formGroup') studentForm:FormGroup
  
  faXmark =faXmark



  student$: Observable<Student> = this.childService.Student$

  isLoading=false
  editStudentinfoMode =false

  studentId = +this.route.snapshot.paramMap.get('id')

  changeIdentityModelOpened=false
  
    // << DATA PLACEHOLDER >> //

  genderOptions=this.sharedService.genderOptions
  booleanOptions = this.sharedService.booleanOptions
  countries$ = this.CountriesService.getCountries()
  cities = this.CountriesService.cities
  states$ = this.CountriesService.getAllStates()
  talents$ = this.studentsService.getTalents()

    // << FORMS >> //

  constructor(
    private fb:FormBuilder,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    public childService:RegisterChildService) { }


  ngOnInit(): void {
    // this.getStudent(this.studentId)
    setTimeout(()=>{

      console.log(this.studentForm.value);
    },2000)
    
  }

  getStudent(studentId){
    this.isLoading = true
    this.studentsService.getStudent(studentId).subscribe((res:Student) =>{
      this.isLoading = true
    })
  }


  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }

}

