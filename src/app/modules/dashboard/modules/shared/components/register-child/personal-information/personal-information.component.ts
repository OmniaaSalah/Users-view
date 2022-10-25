import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { PermissionsEnum } from 'src/app/shared/enums/permissions/permissions.enum';
import { CountriesService } from 'src/app/shared/services/countries/countries.service';
import { SharedService } from 'src/app/shared/services/shared/shared.service';
import { RegisterChildService } from '../../../services/register-child/register-child.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  // @Input('student') student
  @Input('mode') mode : 'edit'| 'view'= 'view'
  faXmark =faXmark
  isLoading=false
  editStudentinfoMode =false

  changeIdentityModelOpened=false
  
    // << DATA PLACEHOLDER >> //

  booleanOptions = this.sharedService.booleanOptions
  cities = this.CountriesService.cities
  states$ = this.CountriesService.getAllStates()

  studentFormm = this.fb.group({
    id: [] ,
    arabicName: [],
    englishName: [],
    surName: [],
    guardianId: [],
    schoolId: [],
    gradeId: [],
    classRoomId: [] ,
    schoolYearId: [] ,
    genderId: [] ,
    religionId: [] ,
    curriculumId: [] ,
    trackId: [] ,
    nationalityId: [] ,
    expireDate:[], //missing
    nationalId:[], //missing
    birthDate: [],
    daleelId: [] ,
    ministerialId: [] ,
    schoolCode: [] ,
    isSpecialAbilities: [] ,
    isSpecialClass: [] ,
    isChildOfAMartyr : [],
    isPassed : [],
    isGifted: [] ,
    emiratesIdPath: [],
    addressId: [] ,
    behaviorId: [],
    city:[], //missing
    emara:[], //missing
    state:[], //missing
    requiredAmount:[], //missing
    paidAmount:[], //missing
    restAmount:[], //missing
    accountantComment:[], //missing
  })

    // << FORMS >> //

  constructor(
    private fb:FormBuilder,
    private sharedService: SharedService,
    private CountriesService:CountriesService,
    public childService:RegisterChildService) { }


  ngOnInit(): void {
    this.childService.onEditMode$.subscribe(console.log)
  }


  ngOnDestroy(): void {
    this.childService.onEditMode$.next(false)
  }

}

